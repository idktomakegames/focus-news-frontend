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
}, [logContext.isLoggedIn, logContext.checked, logContext.globalUser]);

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
        body: JSON.stringify({username: username.trim(), email: email, password: password})
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
          <Link to='/' replace className='self-start absolute top-0 left-0 text-gray-300 opacity-40 hover:text-gray-100 p-3'>&lt;--</Link>
          <img src="/logo.png" width={700} height={400} alt="logo picture" id='logo'/>
        </div>
        <div className='flex flex-col items-center justify-center w-1/2 lg:overflow-scroll' id='signupDiv2'>
        <form onSubmit={(e) => onSubmit(e)} className='my-7'>
          <fieldset className='border rounded-lg border-gray-400 p-6 md:p-10 flex flex-col gap-5 items-center bg-gray-100'>
            <legend className='text-center text-5xl font-semibold'>
              Autentificare
            </legend>
            <h1 className='text-3xl font-semibold pb-5'>Bine ai venit!</h1>
            <input autoComplete='off' className='bg-gray-100 border border-gray-500 p-1 rounded-lg w-full' name='username' type="text" placeholder='Nume utilizator' onChange={(e) => setUsername(e.target.value)} required />
            <input autoComplete='off' className='bg-gray-100 border border-gray-500 p-1 rounded-lg w-full' name='email' type="email" placeholder='Adresa ta de email' onChange={(e) => setEmail(e.target.value)} required />
            <input autoComplete='off' className='bg-gray-100 border border-gray-500 p-1 rounded-lg w-full' name='password' type="password" placeholder='Parola ta' onChange={(e) => setPassword(e.target.value)} required />
            <p className='text-red-500 text-sm font-bold'>{error}</p>
            <p className='text-green-500 text-sm font-bold'>{success}</p>
            <button type='submit' className='bg-blue-500 text-white hover:bg-blue-400 rounded-xl p-1 w-full text-md'>Sign up</button>
            <div>
              <input type="checkbox" id='consent' required />
                <label htmlFor="consent" className="text-sm ml-1">
        Accept <Link to={'/cookies'} className="text-blue-500 hover:text-blue-400 underline">Cookies</Link> și Termenii & Condițiile.
              </label>  
            </div>
            <p>Ai deja cont? <Link className='text-blue-500 font-semibold hover:text-blue-400' to='/login'>Sign in</Link></p>
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
