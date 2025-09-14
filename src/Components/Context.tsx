import { createContext, Dispatch, SetStateAction, useEffect, useState, ReactNode } from 'react';

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

interface Children {
    children: ReactNode
}

export default function Context({ children }: Children) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false)
  const [globalUser, setGlobalUser] = useState('');
  const [checked, setChecked] = useState(false);
  const [gEmail, setGemail] = useState('');

  useEffect(() => {
    async function checkLogIn(){
      
      try {
        const res = await fetch(`https://focus-news-backend-production.up.railway.app/refresh`, {
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
      {children}
      </LogContext.Provider>
    </>
  )
}

