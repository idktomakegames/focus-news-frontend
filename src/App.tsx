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
import ChangePassword from './Routes/ChangePassword';
import Cookies from './Routes/Cookies';
import Context from './Components/Context';


function App() {

  return (
    <>
      <Context>
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
      </Context>
    </>
  )
}

export default App
