import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { LogContext } from '../App';
import userIcon from '../assets/user-solid.svg';
import adminIcon from '../assets/plus-solid.svg';
import menuIcon from '../assets/bars-solid.svg';
import searchIcon from '../assets/magnifying-glass-solid.svg';

export default function Navbar() {

  const [displaySearchbar, setDisplaySearchbar] = useState(false);
  const [sidebarDisplay, setSidebarDisplay] = useState(false);
  const logContext = useContext(LogContext);
  const [searchbarQuery, setSearchbarQuery] = useState('');
  const navigate = useNavigate();

  function onSubmit(){
      navigate(`/search/${searchbarQuery}`)
  }

  return (
    <>
        <nav>
          <ul className="flex justify-evenly bg-blue-800 text-white
           items-center text-lg font-semibold p-11">
            <div>
              <img className='absolute top-0' src="/logo.png" width={120} height={120} alt="logo picture" id='logo' />
            </div>
            <img src={menuIcon} alt='menu' className="filter invert w-4 cursor-pointer -translate-x-2" id='menuBtn' onClick={() => setSidebarDisplay(true)} />
            <div className="flex gap-20 ml-auto" id='navbarSections'>
              <li className="cursor-pointer"><Link to={'/'}>General</Link></li>
              <li className="cursor-pointer"><Link to={'/category/economie'}>Economie</Link></li>
              <li className="cursor-pointer"><Link to={'/category/infrastructura'}>Infrastructură</Link></li>
              <li className="cursor-pointer"><Link to={'/category/politica'}>Politică</Link></li>
              <li className="cursor-pointer"><Link to={'/category/sanatate'}>Sănătate</Link></li>
              <li className="cursor-pointer"><Link to={'/category/tragedii'}>Tragedii</Link></li>
            </div>
            <div className="flex ml-auto items-center">
              {displaySearchbar ? 
              <div className='absolute right-20 items-center' id='searchBar'>
                <form onSubmit={onSubmit} className='flex justify-end'>
                  <input type="text" required placeholder='search' className='border border-gray-400 w-full px-2 outline-gray-400 rounded-md text-black' onChange={(e) => setSearchbarQuery(e.target.value)} />
                  <button type='submit' style={{display: "none"}}> <i className="fa-solid fa-magnifying-glass"/></button>
                  <button onClick={() => setDisplaySearchbar(false)} className='text-2xl p-1'>X</button>
                </form>
              </div>
              : 
              <img src={searchIcon} alt='searchBar' id='searchBar' className="filter invert w-5 cursor-pointer absolute right-20"
              onClick={(() => setDisplaySearchbar(true))}/> }   
              <Link className='cursor-pointer absolute right-10 mr-2' to={'/profile'}><img src={userIcon} alt='profile' className='filter invert w-4' /></Link>
              {logContext.isAdmin ? (
                <Link to="/admin" className='absolute right-2 mr-2'>
                  <img src={adminIcon} alt="admin" className='filter invert w-4' />
                </Link>
              ) : null}      
            </div>     
          </ul>
        </nav>

        {sidebarDisplay ? (
          <div id='sidebar' style={{zIndex: 99}} className='fixed top-0 left-0 text-white bg-blue-950 h-full flex justify-center'>
          <ul className='flex flex-col items-center gap-12 w-full'>
              <button className='text-3xl mt-5 pl-5 self-start' onClick={() => setSidebarDisplay(false)}>X</button>
              <form onSubmit={onSubmit} className='flex justify-end'>
                <input type="text" required placeholder='Caută' className='border border-gray-400 w-full p-1 outline-gray-400 rounded-lg text-black' onChange={(e) => setSearchbarQuery(e.target.value)} />
                <button type='submit' style={{display: "none"}}> <i className="fa-solid fa-magnifying-glass"/></button>
              </form>
              <li className="cursor-pointer"><Link className='text-xl' onClick={() => setSidebarDisplay(false)} to={'/'}>General</Link></li>
              <li className="cursor-pointer"><Link className='text-xl' onClick={() => setSidebarDisplay(false)} to={'/category/economie'}>Economie</Link></li>
              <li className="cursor-pointer"><Link className='text-xl' onClick={() => setSidebarDisplay(false)} to={'/category/infrastructura'}>Infrastructură</Link></li>
              <li className="cursor-pointer"><Link className='text-xl' onClick={() => setSidebarDisplay(false)} to={'/category/politica'}>Politică</Link></li>
              <li className="cursor-pointer"><Link className='text-xl' onClick={() => setSidebarDisplay(false)} to={'/category/sanatate'}>Sănătate</Link></li>
              <li className="cursor-pointer"><Link className='text-xl' onClick={() => setSidebarDisplay(false)} to={'/category/tragedii'}>Tragedii</Link></li>
              <img src="/logo.png" width={200} height={200} alt="logo picture" id='logo' />
          </ul>
        </div>
        ): null}  
    </>
  )
}
