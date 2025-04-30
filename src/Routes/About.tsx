import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function About() {
  return (
    <>
    <Navbar/>
    <h1 className='text-center text-5xl font-semibold py-10'>Despre noi</h1>
    <div className='flex justify-center mt-10'>
        <div className='flex flex-col items-center bg-gray-100 py-12 px-5 rounded-lg p-auto w-1/3 md:py-16' id='aboutContainer'>
            <h2 className="text-xl">
                Dragă cititorule,
            </h2>
            <p className="mb-4 text-lg py-2">
                Focus Giurgiu nu este doar un cotidian independent – acesta reprezintă vocea comunității noastre.
                Spunem povești autentice, scoatem la lumină oameni, fapte și idei care merită. Credem în puterea binelui,
                în transparență, în implicare. Pentru că iubim Giurgiu și vrem să-l facem un loc mai bun.
            </p>
            <p className="mb-4 text-lg">
                Ai o poveste ce merită spusă? Scrie-ne la <a target='_blank' href="mailto:redactiafocusgiurgiu@gmail.com?subject=O poveste ce merită spusă&body=Mesajul tău aici" className="text-blue-400">redactiafocusgiurgiu@gmail.com</a> și hai să aducem lumina împreună!
            </p>
            <p className="text-lg font-semibold">
                Cu prețuire, <br /> Echipa Focus Giurgiu
            </p>
        </div>
    </div>
    <Footer/>
    </>
  )
}
