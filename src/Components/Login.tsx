import { useState, useEffect, useContext } from 'react';
import { LogContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {

  const navigate = useNavigate();
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
}, [logContext.isLoggedIn, logContext.checked, logContext.globalUser]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('')
    setSuccess('');

    try {
      const res = await fetch("https://focus-news-backend-production.up.railway.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({email: email, password: password})
      })

      const result = await res.json();

      if(!res.ok){
        setError(result)
        return;
      }

      if(res.ok){
        setSuccess(result)
        setTimeout(() => {
          logContext.setIsLoggedIn(true)
          window.location.reload()  
        }, 1999)    
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
          <Link to='/' replace className='self-start absolute top-0 left-0 text-gray-300 opacity-40 hover:text-gray-100 p-3'>&lt;--</Link>
          <img src="/logo.png" width={700} height={400} alt="logo picture" id='logo'/>
        </div>
        <div className='flex flex-col items-center justify-center w-1/2 lg:overflow-scroll' id='loginDiv2'>
        <form onSubmit={(e) => onSubmit(e)} className='my-10'>
          <fieldset className='border rounded-lg border-gray-400 p-6 md:p-10 flex flex-col gap-5 items-center bg-gray-100'>
            <legend className='text-center text-5xl font-semibold'>
              Autentificare
            </legend>
            <h1 className='text-3xl font-semibold pb-5'>Bine ai revenit!</h1>
            <input name='email' autoComplete='off' className='bg-gray-100 border border-gray-500 p-1 rounded-lg w-full' type="email" placeholder='Adresa ta de email' required onChange={(e) => setEmail(e.target.value)} />
            <input name='password' autoComplete='off' className='bg-gray-100 border border-gray-500 p-1 rounded-lg w-full' type="password" placeholder='Parola ta' required onChange={(e) => setPassword(e.target.value)} />
            <p className='text-red-500 text-sm font-bold'>{error ? error : null}</p>
            <p className='text-green-500 text-sm font-bold'>{success ? success : null}</p>
            <p>Ai uitat parola? <Link className='text-blue-500 font-semibold hover:text-blue-400' to='/reset/password'>Reset</Link></p>
            <button type='submit' className='bg-blue-500 text-white hover:bg-blue-400 rounded-lg p-1 w-full text-md'>Sign in</button>
            <p>Nu ai cont? <Link className='text-blue-500 font-semibold hover:text-blue-400' to='/signup'>Sign up</Link></p>
          </fieldset>
        </form>
        
        <details className='text-center max-[868px]:mb-14'>
          <summary className='text-xl font-serif'>
            Ai probleme cu autentificarea?
          </summary>
          <div className='flex flex-col items-center'>
          <p className='w-9/12 xl:w-1/3 text-start my-2 '>
              Pentru cea mai bună experiență, asigură-te că modulele cookie sunt activate în setările browserului. Dacă întâmpini probleme la autentificare sau înregistrare:
              <br/>
              <strong>Pe iPhone (Safari):</strong> Setări → Safari → Dezactivează „Blochează toate modulele cookie” și „Previne urmărirea între site-uri”.
              <br/>
              <strong>Pe Android (Chrome):</strong> Setări site → Module cookie → Activează modulele cookie.
              <br/>
              Unele setări ale browserului pot bloca modulele cookie, care sunt esențiale pentru autentificare.
          </p>
          </div>
        </details>    
      </div>
      
      </div>
    </>
  )
}
