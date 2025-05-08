import { useState, useEffect, useContext } from 'react';
import { LogContext } from '../App';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useParams, useNavigate } from 'react-router-dom';

type ArticleProps = {
  _id: string,
  title: string,
  content: string,
  category: string,
  imageUrl: string,
  createdAt: string,
  views: number
}

export default function Article() {

  const { id } = useParams();
  const [currentArticle, setCurrentArticle] = useState<ArticleProps>();
  const navigate = useNavigate();
  const logContext = useContext(LogContext)

  useEffect(() => {
    async function fetchArticle(){
      try {
        const res = await fetch(`https://focus-news-backend-production.up.railway.app/article/${id}`);
        const result = await res.json();
        

        if(!res.ok){
          navigate('*', {replace: true});
          return;
        }

      setCurrentArticle(result);
      } catch (err: unknown) {
        if(err instanceof Error)
          console.error(err)
      } 
    }
    
    fetchArticle();
  }, [id]);

  async function deleteArticle(article: ArticleProps){
    const res = await fetch(`https://focus-news-backend-production.up.railway.app/delete/article`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({query: article._id})
    })

    await res.json();
    if(res.ok){
      navigate('/', {replace: true});
    } 
  }
    
  return (
    <>
      <Navbar/>
      <div className='flex justify-center mt-20' id='articleDiv'>
        <div className='flex flex-col items-center w-1/3 gap-8' id='innerArticleDiv'>
          <img src={currentArticle?.imageUrl} width={700} height={700} alt="articleImage" />
          <div className='flex justify-around w-full'>
            <p className='self-start italic text-gray-600'>{currentArticle?.createdAt.substring(0, 10)}</p> 
            <div className='flex gap-1 items-center'>
              <i className="fa-regular fa-eye"></i>
              <p className='font-mono'>{currentArticle?.views}</p>
          </div>
          </div>          
          <h1 className='text-3xl md:text-4xl'>{currentArticle?.title}</h1>
          <p className='text-lg md:text-xl pb-20 leading-normal whitespace-pre-wrap'>{currentArticle?.content}</p>
          {logContext.isAdmin && <button type='button' onClick={() => deleteArticle(currentArticle!)} className='bg-red-700 text-white rounded-lg mb-3 p-1'>Delete Article</button>}
        </div>   
      </div>
      <Footer/>
    </>
  )
}
