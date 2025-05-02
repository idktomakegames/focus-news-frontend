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
  createdAt: string
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

        console.log(result);
        

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
      body: JSON.stringify({query: article})
    })

    const result = await res.json();

    console.log(result);
    
  }

  return (
    <>
      <Navbar/>
      <div className='flex justify-center mt-20' id='articleDiv'>
        <div className='flex flex-col items-center w-1/3 gap-8' id='innerArticleDiv'>
          <img src={currentArticle?.imageUrl} width={700} height={700} alt="articleImage" />
          <p className='self-start italic text-gray-600'>{currentArticle?.createdAt.substring(0, 10)}</p>
          <h1 className='text-3xl md:text-4xl'>{currentArticle?.title}</h1>
          <p className='text-lg md:text-xl pb-20 leading-normal whitespace-pre-wrap'>{currentArticle?.content}</p>
        </div>
        {logContext.isAdmin && <button type='button' onClick={() => deleteArticle(currentArticle!)} className='bg-red-700 text-white rounded-lg p-1'>Delete Article</button>}   
      </div>
      <Footer/>
    </>
  )
}
