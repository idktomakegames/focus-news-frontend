import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar/>
      <div className='flex flex-col justify-center items-center min-h-96'>
        <h1 className='text-4xl md:text-5xl text-gray-900 font-serif'>404 Page not found :/</h1>
      </div>
      
      <Footer/>
    </>
  )
}
