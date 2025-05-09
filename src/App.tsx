import { Routes, Route } from 'react-router-dom';
import General from './Routes/General';
import Economie from './Routes/Economie';
import Infrastructura from './Routes/Infrastructura';
import Sanatate from './Routes/Sanatate';
import Tragedii from './Routes/Tragedii';
import NotFound from './Routes/NotFound';
import Article from './Routes/Article';
import Profile from './Routes/Profile';
import Politica from './Routes/Politica';
import Search from './Routes/Search';
import Login from './Components/Login';
import ResetPassword from './Routes/ResetPassword';
import Signup from './Components/Signup';
import About from './Routes/About';
import Privacy from './Routes/Privacy';
import Admin from './Components/Admin';
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import ChangePassword from './Routes/ChangePassword';
import Cookies from './Routes/Cookies';

type LogProps = {
  isLoggedIn: boolean,
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>,
  isAdmin: boolean,
  setIsAdmin: Dispatch<SetStateAction<boolean>>,
  globalUser: string,
  setGlobalUser: Dispatch<SetStateAction<string>>,
  checked: boolean,
  setChecked: Dispatch<SetStateAction<boolean>>,
  gEmail: string, 
  setGemail: Dispatch<SetStateAction<string>>
}

export const LogContext = createContext<LogProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
  globalUser: '',
  setGlobalUser: () => {},
  checked: false,
  setChecked: () => {},
  gEmail: '', 
  setGemail: () => {}
})

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false)
  const [globalUser, setGlobalUser] = useState('');
  const [checked, setChecked] = useState(false);
  const [gEmail, setGemail] = useState('');

  useEffect(() => {
    async function checkLogIn(){
      
      try {
        const res = await fetch(`https://focus-news-backend-production.up.railway.app/check/permissions`, {
        credentials: "include"
      });

        const result = await res.json();

        if(res.ok){
          setIsLoggedIn(true)
          setGlobalUser(result.username);
          setGemail(result.email)
        } else {
          setIsLoggedIn(false)
          setGlobalUser('');
          return;
        }

        if(result.role === "admin"){
          setIsAdmin(true);
        } else{
          setIsAdmin(false);
        }
      } catch (err: unknown) {
        if(err instanceof Error){
          console.error("Something went wrong...")
        }
      } finally {
        setChecked(true)
      }   
    }
    checkLogIn();
  }, []);

  return (
    <>
      <LogContext.Provider value={{isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin, globalUser, setGlobalUser, checked, setChecked, gEmail, setGemail}}>
      <Routes>
        <Route path='/' element={<General />}/>
        <Route path='/category/economie' element={<Economie />}/>
        <Route path='/category/infrastructura' element={<Infrastructura />}/>
        <Route path='/category/politica' element={<Politica />}/>
        <Route path='/category/sanatate' element={<Sanatate />}/>
        <Route path='/category/tragedii' element={<Tragedii />}/>
        <Route path='/article/:id' element={<Article />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/reset/password' element={<ResetPassword />} />
        <Route path='/reset/password/:token' element={<ChangePassword />} />
        <Route path='/about-us' element={<About/>}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/admin' element={<Admin />}/>
        <Route path='/cookies' element={<Cookies />}/>
        <Route path='/privacy' element={<Privacy />}/>
        <Route path='/search/:query' element={<Search />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      </LogContext.Provider>
    </>
  )
}

export default App
