import { useState, useContext, useEffect } from 'react';
import { LogContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const logContext = useContext(LogContext);

  useEffect(() => {
    if (logContext.checked) { 
      if (logContext.isLoggedIn) {
        navigate("/", { replace: true });
      }
    }
}, [logContext.isLoggedIn]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('')
    setSuccess('');

    if(password.length < 6){
      setError("Parola trebuie conțină cel puțin 6 caractere")
      return;
    }

    try {
      const res = await fetch(`https://focus-news-backend-production.up.railway.app/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({username: username, email: email, password: password})
      })

      const result = await res.json();

      if(!res.ok){
        setError(result);
        return;
      }

      if(res.ok){
        setSuccess(result)
        setTimeout(() => {
          logContext.setIsLoggedIn(true)  
        }, 2000)    
      }
      
    } catch (err) {
      if(err instanceof Error){
        setError(err.message);
      }
    }
  }

  return (
    <>
      <div className='w-full h-screen flex' id='signupDiv'>
        <div className='bg-blue-900 w-1/2 h-full flex flex-col items-center' id='signupDiv1'>
          <Link to='/' className='self-start text-gray-300 opacity-40 hover:text-gray-100 p-3' onClick={() => navigate(-1)}>&lt;--</Link>
          <img src="/logo.png" width={700} height={400} alt="logo picture" id='logo'/>
        </div>
        <div className='flex flex-col items-center justify-center w-1/2' id='signupDiv2'>
        <form onSubmit={(e) => onSubmit(e)} className='my-10'>
          <fieldset className='border rounded-lg border-gray-400 p-6 md:p-10 flex flex-col gap-5 items-center bg-gray-100'>
            <legend className='text-center text-5xl font-semibold'>
              Autentificare
            </legend>
            <h1 className='text-3xl font-semibold pb-5'>Bine ai venit!</h1>
            <input className='bg-gray-100 border border-gray-500 p-1 rounded-lg w-full' type="text" placeholder='Nume utilizator' onChange={(e) => setUsername(e.target.value)} required />
            <input className='bg-gray-100 border border-gray-500 p-1 rounded-lg w-full' type="email" placeholder='Adresa ta de email' onChange={(e) => setEmail(e.target.value)} required />
            <input className='bg-gray-100 border border-gray-500 p-1 rounded-lg w-full' type="password" placeholder='Parola ta' onChange={(e) => setPassword(e.target.value)} required />
            <p className='text-red-500 text-sm font-bold'>{error}</p>
            <p className='text-green-500 text-sm font-bold'>{success}</p>
            <button type='submit' className='bg-blue-500 text-white hover:bg-blue-400 rounded-xl p-1 w-full text-md'>Sign up</button>
            <p>Ai deja cont? <Link className='text-blue-500 font-semibold hover:text-blue-400' to='/login'>Sign in</Link></p>
          </fieldset>
        </form>
      </div>
      </div>
    </>
  )
}
