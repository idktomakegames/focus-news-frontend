import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function Cookies() {
  return (
    <>
    <Navbar/>
    <h1 className='text-center text-5xl font-semibold py-10'>Politica de Cookies</h1>
    <div className='flex justify-center mt-10'>
        <div className='flex flex-col items-center bg-gray-100 py-12 px-5 rounded-lg p-auto w-1/3 md:py-16' id='aboutContainer'>
            <h2 className="text-xl">
                Politica de Cookies
            </h2>
            <p className="mb-4 text-lg py-2">
            Site-ul nostru folosește cookies pentru a îmbunătăți experiența utilizatorilor și pentru a asigura funcționarea corectă a anumitor funcționalități, în special în ceea ce privește autentificarea utilizatorilor.
            </p>
            <h2 className="text-xl">Ce sunt cookies?</h2>
            <p className="mb-4 text-lg">
                Cookies sunt fișiere mici care sunt stocate pe dispozitivul dumneavoastră atunci când accesați site-ul nostru. Acestea ne ajută să păstrăm sesiunea de autentificare activă și să îmbunătățim performanța site-ului.
            </p>
            <h2 className="text-xl">Cum utilizăm cookies?</h2>
            <p>
                Acestea sunt utilizate pentru a păstra sesiunea de autentificare activă, astfel încât să nu fie necesar să vă reconectați la fiecare accesare a site-ului.
            </p>
        </div>
    </div>
    <Footer/>
    </>
  )
}
