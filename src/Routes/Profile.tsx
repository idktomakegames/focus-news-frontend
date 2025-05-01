import { useEffect, useContext } from 'react';
import { LogContext } from '../App';
import { useNavigate, Link } from 'react-router-dom';

export default function Profile() {

  const logContext = useContext(LogContext)
  const navigate = useNavigate();

  useEffect(() => {
    if (logContext.checked) { 
      if (!logContext.isLoggedIn) {
        navigate("/login", { replace: true });
    }
  }
  }, [logContext.isLoggedIn, logContext.checked, logContext.globalUser]);


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

  return (
    <>
      <div className='w-full h-screen flex' id='loginDiv'>
        <div className='bg-blue-900 w-1/2 h-full flex flex-col items-center' id='loginDiv1'>
          <Link to='/' className='self-start absolute top-0 left-0 text-gray-300 opacity-40 hover:text-gray-100 p-3' onClick={() => navigate("/", {replace: true})}>&lt;--</Link>
          <img src="/logo.png" width={700} height={400} alt="logo picture" id='logo'/>
        </div>
        <div className='flex flex-col items-center justify-center w-1/2' id='loginDiv2'>
        <form>
          <fieldset className='border rounded-lg border-gray-400 p-4 md:p-10 flex flex-col gap-5 items-center bg-gray-100'>
            <legend className='text-center text-5xl font-semibold'>
              Profil
            </legend>
            <h1 className='text-3xl font-semibold pb-5'>Bine ai revenit {logContext.globalUser ? logContext.globalUser : ""}!</h1>
            <i className="fa-solid fa-circle-user text-8xl"></i>
            <button className='bg-red-700 hover:bg-red-600 text-white rounded-lg p-1 w-full' onClick={logout}>Log out</button>
          </fieldset>
        </form>
      </div>
      </div>
    </>
  )
}
