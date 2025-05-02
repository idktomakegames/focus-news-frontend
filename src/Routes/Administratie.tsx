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

export default function Administratie() {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [articles, setArticles] = useState<ArticleProps[]>([]);


    useEffect(() => {
      async function fetchArticles() {
      const res = await fetch(`https://focus-news-backend-production.up.railway.app/get-articles/${currentPage}`)
      const result = await res.json();
      setArticles(result.articles)
      setTotalPages(result.totalPages)
      console.log(totalPages);
      console.log(res);
      
      
    }
    fetchArticles()
    }, [currentPage]);

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
      <h1 className='text-center text-4xl md:text-5xl font-semibold py-10'>Administrație/Home</h1>
      <div className='flex justify-center'>
          <div className="grid gap-5" id="articlesDisplay">
            {articles?.length > 0 && (
                <Link to={`/article/${articles[0]?._id}`} className='col-span-full' id='firstArticle'>
                <fieldset className="flex flex-col items-center">
                      <div className='relative w-full'>
                        <img src={articles[0].imageUrl} alt="articleImage" className='opacity-70 w-full h-[500px] object-cover border-2 border-gray-400 rounded-lg' />
                        <h1 className='p-10 text-3xl absolute inset-0 font-extrabold' style={{zIndex: 10}}>{articles[0].title}</h1>
                      </div>                      
                </fieldset> 
              </Link>)}
            {articles?.map((article, index) => <Link to={`/article/${article._id}`} key={index}>
              <fieldset className="border-2 border-gray-400 h-80 rounded-lg flex flex-col items-center">
                  <img src={article.imageUrl} alt="articleImage" className='w-full h-1/2' />
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
