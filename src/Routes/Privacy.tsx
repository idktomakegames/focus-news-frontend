import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function Privacy() {
  return (
    <>
    <Navbar/>
    <h1 className='text-center text-3xl md:text-5xl  font-semibold py-10'>Politica de Confidențialitate</h1>
    <div className='flex justify-center'>
        <div className='flex flex-col justify-center bg-gray-100 px-5 rounded-lg p-auto w-1/3 md:py-16' id='aboutContainer'>
            <h2 className="text-xl font-semibold">
                Politica de Confidențialitate
            </h2>
            <p className="mb-4 text-lg py-2">
                La focus-giurgiu.ro, protejăm confidențialitatea datelor dumneavoastră personale. Vă explicăm în această politică ce informații colectăm, cum le utilizăm și ce drepturi aveți asupra lor.
            </p>
            
            <h2 className="text-xl font-semibold">Informațiile pe care le colectăm</h2>
            <p className="mb-4 text-lg">
                Colectăm informații personale atunci când vă înregistrați pe site, completați formulare sau interacționați cu platforma noastră. Aceste informații pot include:
                <ul className="list-disc pl-5 mt-2">
                    <li>Numele utilizatorului</li>
                    <li>Adresă de email</li>
                </ul>
            </p>

            <h2 className="text-xl font-semibold">Cum utilizăm informațiile dumneavoastră</h2>
            <p className="mb-4 text-lg">
                Informațiile colectate sunt folosite pentru:
                <ul className="list-disc pl-5 mt-2">
                    <li>Crearea și gestionarea contului dumneavoastră</li>
                    <li>Comunicarea actualizărilor sau informațiilor relevante</li>
                </ul>
            </p>

            <h2 className="text-xl font-semibold">Protecția datelor dumneavoastră</h2>
            <p className="mb-4 text-lg">
                Ne angajăm să protejăm datele personale pe care le colectăm. Implementăm măsuri de securitate pentru a preveni accesul neautorizat, modificarea sau divulgarea acestora. Cu toate acestea, nu putem garanta o protecție absolută a datelor în fața unor atacuri externe.
            </p>

            <h2 className="text-xl font-semibold">Drepturile dumneavoastră</h2>
            <p className="mb-4 text-lg">
                Conform legislației privind protecția datelor, aveți dreptul să:
                <ul className="list-disc pl-5 mt-2">
                    <li>Accesați informațiile personale pe care le deținem despre dumneavoastră</li>
                    <li>Corectați orice informații incorecte sau incomplete</li>
                    <li>Solicitați ștergerea informațiilor dumneavoastră personale</li>
                    <li>Retrageți consimțământul pentru prelucrarea datelor (dacă este cazul)</li>
                </ul>
            </p>

            <h2 className="text-xl font-semibold">Păstrarea datelor</h2>
            <p className="mb-4 text-lg">
                Vom păstra datele dumneavoastră personale doar pe durata necesară pentru îndeplinirea scopurilor pentru care au fost colectate sau conform cerințelor legale.
            </p>

            <h2 className="text-xl font-semibold">Transferul datelor</h2>
            <p className="mb-4 text-lg">
                Datele dumneavoastră personale nu vor fi vândute, schimbate sau închiriate altor entități. Dacă există transferuri internaționale de date, vom asigura protecția acestora conform legislației aplicabile.
            </p>

            <h2 className="text-xl font-semibold">Modificări ale Politicii de Confidențialitate</h2>
            <p className="mb-4 text-lg">
                Această politică poate fi actualizată periodic. Orice modificări vor fi publicate pe această pagină, iar utilizatorii vor fi informați în caz de modificări semnificative.
            </p>

            <h2 className="text-xl font-semibold">Contactați-ne</h2>
            <p className="mb-4 text-lg">
                Dacă aveți întrebări sau preocupări legate de Politica de Confidențialitate, nu ezitați să ne contactați la <a target='_blank' href="mailto:redactiafocusgiurgiu@gmail.com?subject=O poveste ce merită spusă&body=Mesajul tău aici" className="text-blue-400">redactiafocusgiurgiu@gmail.com</a>.
            </p>
        </div>
    </div>
    <Footer/>
    </>
  )
}
