import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
        <footer className="bg-blue-950 text-white text-center text-sm p-6" id='footer'>
            <div className='flex gap-5 justify-evenly max-md:flex-col'>
                <Link to='/privacy' className='text-gray-400 hover:text-blue-100'>Privacy Policy</Link>
                <Link to='/about-us' className='text-gray-400 hover:text-blue-100'>Despre noi</Link>
                <Link to='/cookies' className='text-gray-400 hover:text-blue-100'>Cookies</Link>
                <h1 className='text-gray-400 select-none'>&copy; 2025 <Link to={'/'} className='text-gray-400 hover:text-blue-100'>FocusNews</Link>. Toate drepturile rezervate.</h1>
            </div>       
        </footer>
    </>
  )
}
