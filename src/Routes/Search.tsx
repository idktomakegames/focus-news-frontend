import { Link, useParams } from 'react-router-dom';
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

export default function Search() {

    const [articles, setArticles] = useState<ArticleProps[]>([]);
    const { query } = useParams();
    const [error, setError] = useState('');


    useEffect(() => {
        async function queryArticles(){
            const res = await fetch(`https://focus-news-backend-production.up.railway.app/search/${query}`);
            const result = await res.json();
            console.log(result);
            

            if(!res.ok){
                setError(result);
                return;
            }

            setArticles(result)
        }

        queryArticles();
    }, []);
  
    return (
      <>
      <Navbar/>
      <h1 className='text-center text-3xl md:text-5xl font-semibold py-10'>Rezultate pentru '{query}'</h1>
      <hr />
      <h1 className='text-center text-lg md:text-2xl font-semibold py-10 text-gray-600'>{error}</h1>
      <div className='flex justify-center mb-8'>
          <div className="grid gap-5" id='articlesDisplay'>
            {articles?.map((article, index) => <Link to={`/article/${article._id}`} key={index}>
              <fieldset className="border-2 border-gray-400 w-full h-80 rounded-lg flex flex-col items-center">
                  <img src={article.imageUrl} alt="articleImage" className='w-full h-1/2' />
                  <h1 className="text-md font-semibold p-2">{article.title}</h1>
              </fieldset> 
            </Link>)}  
          </div>
      </div>
      <Footer/> 
      </> 
    )
}
