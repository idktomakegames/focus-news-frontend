import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogContext } from '../App';

export default function ResetPassword() {

    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const logContext = useContext(LogContext);

   useEffect(() => {
    if (logContext.isLoggedIn) {
        navigate("/", {replace: true})
  }
}, [logContext.isLoggedIn]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('')
    setSuccess('');

    try {
      const res = await fetch(`https://focus-news-backend-production.up.railway.app/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email: email})
      })

      const result = await res.json();

      if(!res.ok){
        e.preventDefault();
        setError(result)
        return;
      }

      if(res.ok){
        setSuccess(result);
        setTimeout(() => {
          navigate('/login', {replace: true}) 
        }, 3000)     
      }
      
    } catch (err) {
      if(err instanceof Error){
        e.preventDefault();
        setError(err.message);
      }
    }
  }


  return (
    <>
        <div className='w-full h-screen flex' id='loginDiv'>
        <div className='bg-blue-900 w-1/2 h-full flex flex-col items-center' id='loginDiv1'>
          <Link to='/' className='self-start text-gray-300 opacity-40 hover:text-gray-100 p-3' onClick={() => navigate(-1)}>&lt;--</Link>
          <img src="/logo.png" width={700} height={400} alt="logo picture" id='logo'/>
        </div>
        <div className='flex flex-col items-center justify-center w-1/2' id='loginDiv2'>
        <form onSubmit={(e) => onSubmit(e)} className='m-10'>
          <fieldset className='border rounded-lg border-gray-400 p-10 flex flex-col gap-5 items-center bg-gray-100'>
            <legend className='text-center text-5xl font-semibold'>
              Resetare Parolă
            </legend>
            <input className='bg-gray-100 border border-gray-500 p-1 rounded-lg w-full' type="email" placeholder='Adresa ta de email' required onChange={(e) => setEmail(e.target.value)} />
            <p className='text-red-500 text-sm font-bold'>{error}</p>
            <p className='text-green-500 text-sm font-bold'>{success}</p>
            <button type='submit' className='bg-red-500 text-white hover:bg-red-400 rounded-lg p-1 w-full text-md'>Resetează</button>
          </fieldset>
        </form>
      </div>
      </div>
    </>
  )
}



