import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { LogContext } from '../App';

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
            <i className="fa-solid fa-bars cursor-pointer" id='menuBtn' onClick={() => setSidebarDisplay(true)}></i>
            <div className="flex gap-20 ml-auto" id='navbarSections'>
              <li className="cursor-pointer"><Link to={'/'}>General</Link></li>
              <li className="cursor-pointer"><Link to={'/category/economie'}>Economie</Link></li>
              <li className="cursor-pointer"><Link to={'/category/infrastructura'}>Infrastructură</Link></li>
              <li className="cursor-pointer"><Link to={'/category/infrastructura'}>Politică</Link></li>
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
              <i id='searchBar' className="fa-solid fa-magnifying-glass cursor-pointer absolute right-20"
              onClick={(() => setDisplaySearchbar(true))}></i> }   
              <Link className='cursor-pointer absolute right-10 mr-2' to={'/profile'}><i className="fa-solid fa-user"></i></Link>
              {logContext.isAdmin ? (
                <Link to="/admin" className='absolute right-2 mr-2'>
                  <i className="fa-solid fa-plus"></i>
                </Link>
              ) : null}      
            </div>     
          </ul>
        </nav>

        {sidebarDisplay ? (
          <div id='sidebar' style={{zIndex: 99}} className='fixed top-0 left-0 text-white bg-blue-950 h-full flex justify-center'>
          <ul className='flex flex-col items-center gap-16 w-full'>
              <button className='text-3xl mt-5 pr-5 self-end' onClick={() => setSidebarDisplay(false)}>X</button>
              <form onSubmit={onSubmit} className='flex justify-end'>
                <input type="text" required placeholder='search' className='border border-gray-400 w-full p-1 outline-gray-400 rounded-sm text-black' onChange={(e) => setSearchbarQuery(e.target.value)} />
                <button type='submit' style={{display: "none"}}> <i className="fa-solid fa-magnifying-glass"/></button>
              </form>
              <li className="cursor-pointer"><Link className='text-xl' onClick={() => setSidebarDisplay(false)} to={'/'}>Administrație</Link></li>
              <li className="cursor-pointer"><Link className='text-xl' onClick={() => setSidebarDisplay(false)} to={'/category/economie'}>Economie</Link></li>
              <li className="cursor-pointer"><Link className='text-xl' onClick={() => setSidebarDisplay(false)} to={'/category/infrastructura'}>Infrastructură</Link></li>
              <li className="cursor-pointer"><Link className='text-xl' onClick={() => setSidebarDisplay(false)} to={'/category/sanatate'}>Sănătate</Link></li>
              <li className="cursor-pointer"><Link className='text-xl' onClick={() => setSidebarDisplay(false)} to={'/category/tragedii'}>Tragedii</Link></li>
              <img src="/logo.png" width={200} height={200} alt="logo picture" id='logo' />
          </ul>
        </div>
        ): null}  
    </>
  )
}
