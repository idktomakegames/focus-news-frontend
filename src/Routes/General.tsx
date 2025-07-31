import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useEffect, useState } from 'react';

type ArticleProps = {
  _id: string,
  title: string,
  content: string,
  category: string,
  imageUrl: string
}

export default function General() {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [articles, setArticles] = useState<ArticleProps[]>([]);
    const [sort, setSort] = useState("newest");

    useEffect(() => {
      async function fetchArticles() {
      const res = await fetch(`https://focus-news-backend-production.up.railway.app/get-articles/${currentPage}/${sort}`)
      const result = await res.json();
      setArticles(result.articles)
      setTotalPages(result.totalPages)
          
    }
    fetchArticles()
    }, [currentPage, sort]);

    function nextPage(){
      if(currentPage === totalPages) return;
      setCurrentPage(p => p + 1)
    }

    function prevPage(){
      if(currentPage === 1) return;
      setCurrentPage(p => p - 1)
    }
    
  
    return (
      <>
      <Navbar/>
      <h1 className='text-center text-4xl md:text-5xl font-semibold pt-10 pb-5'>General</h1>
      <div className='flex justify-center items-center py-5 gap-2'>
            <label className='font-semibold'>Sortare:</label>
            <select onChange={(e) => setSort(e.target.value)} className='border border-gray-300 bg-gray-200 rounded-lg p-1'>
                    <option value="newest" defaultChecked>Cele mai noi</option>
                    <option value="popular" defaultChecked>Cele mai populare</option>
                    <option value="oldest">Cele mai vechi</option>
            </select> 
      </div>
      <div className='flex justify-center'>
          <div className="grid gap-5" id="articlesDisplay">
            {articles?.length > 0 && (
                <Link to={`/article/${articles[0]?._id}`} className='col-span-full' id='firstArticle'>
                <fieldset className="flex flex-col items-center border-2 border-blue-600 rounded-lg">
                      <div className='relative w-full'>
                        <img src={articles[0].imageUrl} alt="articleImage" className='w-full h-[500px] object-cover border-2 border-blue-600 rounded-lg' />
                        <h1 className='p-10 text-3xl absolute inset-0 font-extrabold text-white' style={{zIndex: 10}}>{articles[0].title}</h1>
                      </div>                  
                </fieldset> 
              </Link>)}
            {articles?.map((article, index) => <Link to={`/article/${article._id}`} key={index}>
              <fieldset className="border-2 border-blue-600 h-80 rounded-lg flex flex-col items-center bg-blue-50">
                  <img src={article.imageUrl} alt="articleImage" className='w-full h-1/2 object-cover' />
                  <h1 className="text-md font-semibold p-2">{article.title}</h1>
              </fieldset> 
            </Link>)}  
          </div>
      </div>

      <div className='flex justify-center gap-2 py-5'>
        <button className='cursor-pointer bg-gray-200 font-bold rounded-full text-xl px-5' onClick={prevPage}>&lt;</button>
        <p className='text-xl '>{currentPage}/{totalPages}</p>
        <button className='cursor-pointer bg-gray-200 font-bold rounded-full text-xl px-5' onClick={nextPage}>&gt;</button>
      </div>
      <Footer/> 
      </> 
    )
}
