import { useEffect, useContext, useState } from 'react';
import { LogContext } from '../App';
import { useNavigate, Link } from 'react-router-dom';

export default function Profile() {

  const logContext = useContext(LogContext)
  const navigate = useNavigate();
  const [updatedUsername, setUpdatedUsername] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (logContext.checked) { 
      if (!logContext.isLoggedIn) {
        navigate("/login", { replace: true });
    }
  }
  }, [logContext.isLoggedIn, logContext.checked]);


  async function logout(){
    const res = await fetch(`https://focus-news-backend-production.up.railway.app/logout`, {
      credentials: "include"
    });

    if(res.ok){
      logContext.setIsLoggedIn(false);
      logContext.setGlobalUser('');
      window.location.reload();
    }
  }


  async function update(e: React.FormEvent){
    e.preventDefault();
    setError('')
    setSuccess('')

    if (!updatedUsername && !updatedEmail) {
      setError('Completează cel puțin unul dintre câmpuri pentru a continua');
      return;
    }

    if(!updatedEmail.includes("@") && updatedEmail.length < 10){
      setError('Invalid email');
      return;
    }
    
    try {
      const res = await fetch(`https://focus-news-backend-production.up.railway.app/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({username: updatedUsername || undefined, email: updatedEmail || undefined})
      });
  
      const result = await res.json()
  
      if(res.ok){
        setSuccess(result)
        setTimeout(() => {
          window.location.reload();
        }, 1000)   
      }
      
    } catch (err: unknown) {
      if(err instanceof Error)
        setError(err.message)
    }
  }

  return (
    <>
      <div className='w-full h-screen flex' id='loginDiv'>
        <div className='bg-blue-900 w-1/2 h-full flex flex-col items-center' id='loginDiv1'>
          <Link to='/' replace className='self-start absolute top-0 left-0 text-gray-300 opacity-40 hover:text-gray-100 p-3'>&lt;--</Link>
          <img src="/logo.png" width={700} height={400} alt="logo picture" id='logo'/>
        </div>
        <div className='flex flex-col items-center justify-center w-1/2' id='loginDiv2'>
        <form onSubmit={(e) => update(e)}>
          <fieldset className='border rounded-lg border-gray-400 p-4 md:p-10 flex flex-col gap-5 items-center bg-gray-100'>
            <legend className='text-center text-4xl md:text-5xl font-semibold'>
              Profil
            </legend>
            <h1 className='text-3xl font-semibold pb-5'>Bine ai revenit {logContext.globalUser ? logContext.globalUser : ""}!</h1>
            <i className="fa-solid fa-circle-user text-8xl"></i>
            <input className='p-1 rounded-lg border border-gray-700' type="text" placeholder='update username' onChange={(e) => setUpdatedUsername(e.target.value)} />
            <input className='p-1 rounded-lg border border-gray-700' type="email" placeholder='update email' onChange={(e) => setUpdatedEmail(e.target.value)} />
            <p className='text-green-700 font-bold'>{success}</p>
            <p className='text-red-700 font-bold'>{error}</p>
            <button type='submit' className='p-1 bg-blue-600 text-white rounded-lg'>Update Info</button>
            <button type='button' className='bg-red-700 hover:bg-red-600 text-white rounded-lg p-1 w-full' onClick={logout}>Log out</button>
          </fieldset>
        </form>
      </div>
      </div>
    </>
  )
}
