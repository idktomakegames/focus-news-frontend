import { useState, useEffect, useContext } from 'react';
import { LogContext } from '../Components/Context';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import eyeImg from '../assets/eye-regular.svg'

type ArticleProps = {
  _id: string,
  title: string,
  content: string,
  category: string,
  imageUrl: string,
  imageUrl2: string,
  createdAt: string,
  views: number
}

export default function Article() {

  const { id } = useParams();
  const [currentArticle, setCurrentArticle] = useState<ArticleProps>();
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [contentHalf1, setContentHalf1] = useState("");
  const [contentHalf2, setContentHalf2] = useState("");
  const navigate = useNavigate();
  const logContext = useContext(LogContext)


  useEffect(() => {
    if(currentArticle == null) return
    setTitle(currentArticle.title)
    setContent(currentArticle.content)

    const articleContent = currentArticle.content
    const middle = Math.ceil(articleContent.length / 3)
    const splitPoint = articleContent.lastIndexOf(".", middle * 2) + 1;
    const half1 = articleContent.slice(0, splitPoint)
    const half2 = articleContent.slice(splitPoint)
    setContentHalf1(half1)
    setContentHalf2(half2)
  }, [currentArticle])

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
  }, [id, refresh]);

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

  async function updateArticle(article: ArticleProps){
    setError('');
    if(title.trim() === currentArticle?.title.trim() && content.trim() === currentArticle?.content.trim()){
      setError("Nu au fost făcute modificări")
      return;
    }

    try {
      const res = await fetch('https://focus-news-backend-production.up.railway.app/update/article', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({query: article._id, title: title, content: content})
    })
      const result = await res.json();

      if(res.ok) {
        setSuccess(result)
        setTimeout(() => {
          setIsEditing(false)
          setRefresh(prev => !prev)
        }, 1000)
        return
      }
      setError(result)

    } catch (error) {
      if(error instanceof Error)
        setError(error.message)
  }
}
    
  return (
    <>
      <Navbar/>
      <div className='flex justify-center mt-20' id='articleDiv'>
        <div className='flex flex-col items-center w-1/3 gap-8' id='innerArticleDiv'>
          <img src={currentArticle?.imageUrl} width={700} height={700} alt="articleImage" />
          <div className='flex justify-between w-full'>
            <p className='self-start italic text-gray-600'>{currentArticle?.createdAt.substring(0, 10)}</p> 
            <div className='flex gap-1 items-center'>
              <img src={eyeImg} alt='views' className="w-4"/>
              <p className='font-mono'>{currentArticle?.views}</p>
          </div>
          </div>
          {isEditing ? 
          <>
            <input type="text" className='bg-gray-100 border overflow-x-scroll border-gray-500 py-2 px-1 rounded-lg w-full' placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea className='bg-gray-100 border max-[800px]:h-60 border-gray-500 py-2 px-1 rounded-lg w-full overflow-y-auto' placeholder='content' value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            <p className='text-sm text-red-600 font-semibold'>{error}</p>
            <p className='text-sm text-green-600 font-semibold'>{success}</p>
            <div className='flex gap-3'>
              <button type='button' onClick={() => updateArticle(currentArticle!)} className='bg-green-700 text-white rounded-lg mb-3 p-1'>Save</button>
              <button type='button' onClick={() => setIsEditing(false)} className='bg-red-700 text-white rounded-lg mb-3 p-1'>Exit</button>
            </div>       
          </>         
          : 
          <>
            <h1 className='text-3xl md:text-4xl'>{currentArticle?.title}</h1>
            {currentArticle?.imageUrl2 ? (
              <div className='flex flex-col'>
                <p className='text-lg md:text-xl pb-10 leading-normal whitespace-pre-wrap'>{contentHalf1}</p>
                <img src={currentArticle?.imageUrl2} width={600} height={400} alt="articleImage2" className='rounded-lg self-center'/>
                <p className='text-lg md:text-xl pt-4 pb-20 leading-normal whitespace-pre-wrap'>{contentHalf2}</p>
              </div>           
            ) :    
            <p className='text-lg md:text-xl pb-20 leading-normal whitespace-pre-wrap'>{currentArticle?.content}</p> }
            <div className='flex gap-3'>
              {logContext.isAdmin && <button type='button' onClick={() => deleteArticle(currentArticle!)} className='bg-red-700 text-white rounded-lg mb-3 p-1'>Delete Article</button>}
              {logContext.isAdmin && <button type='button' onClick={() => {
                setIsEditing(true)
                setError('')
                setSuccess('');
              }} className='bg-blue-700 text-white rounded-lg mb-3 p-1'>Edit Article</button>}
            </div>      
          </>        
          }
        </div>   
      </div>
      <Footer/>
    </>
  )
}
