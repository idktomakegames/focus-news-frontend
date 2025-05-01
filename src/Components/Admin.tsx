import { useContext, useEffect, useState } from 'react'
import { LogContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';


export default function Admin() {

    const [image, setImage] = useState<File | null>(null)
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [uploadError, setUploadError] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [deleteSuccess, setDeleteSuccess] = useState('');
    const [isUploadActive, setIsUploadActive] = useState(false);
    const [isDeleteActive, setIsDeleteActive] = useState(false);
    const navigate = useNavigate();
    const [deleteQuery, setDeleteQuery] = useState('');
    const logContext = useContext(LogContext)

    useEffect(() => {
      if (logContext.checked) { 
        if (!logContext.isLoggedIn) {
          navigate("/login", { replace: true });
          return;
        } else if(!logContext.isAdmin){
          navigate("/", { replace: true });
          return;
        }
      }
    }, [logContext.isLoggedIn, logContext.checked, logContext.isAdmin]);

    async function submitArticle(e: React.FormEvent) {
      setIsUploadActive(true)
      setUploadSuccess('')
      setUploadError('');
      e.preventDefault();

      if(title.trim() === ''){
        setUploadError("No title provided");
        setIsUploadActive(false)
        return;
      }
      if(content.trim() === ''){
        setUploadError("No content provided");
        setIsUploadActive(false)
        return;
      }
      if(category === ''){
        setUploadError("No category provided");
        setIsUploadActive(false)
        return;
      }
      if(image == null){
        setUploadError("No image provided");
        setIsUploadActive(false)
        return;
      }

      const data = new FormData()
      data.append('articleImg', image)

      try {
        const res = await fetch('https://focus-news-backend-production.up.railway.app/upload-image', {
        method: "POST",
        credentials: "include",
        body: data
      });
        const result = await res.json();
        const imageUrl = result.imageUrl;

      if(res.status === 201){
          const res2 = await fetch('https://focus-news-backend-production.up.railway.app/post-article', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({title: title, content: content, category: category, imageUrl: imageUrl})
        })
        const result2 = await res2.json();

        if(!res2.ok){
          setUploadError(result2);
          setIsUploadActive(false);
          return;
        }
        if(res.status === 201 && res2.status === 201){
          setUploadSuccess("Article uploaded successfully");
          setIsUploadActive(false)
        }
      }}catch (err: unknown) {
        if(err instanceof Error){
          setUploadError(err.message);
          setIsUploadActive(false);
    }
  }
}  

  async function deleteArticle(e: React.FormEvent){
    setIsDeleteActive(true)
    setDeleteError('')
    setDeleteSuccess('')
    e.preventDefault();
    console.log(deleteQuery);
    
    try {
      const res = await fetch("https://focus-news-backend-production.up.railway.app/delete/article", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({query: deleteQuery})
      })

      const result = await res.json();
      if(res.ok){
        setDeleteSuccess(`${result.message}: ${result.title}`);
        setIsDeleteActive(false)
        return;
      }
      setDeleteError(result.message)
      setIsDeleteActive(false)

    } catch (err: unknown) {
      if(err instanceof Error){
        setDeleteError(err.message)
        setIsDeleteActive(false)
    }
  }
}

  return (
    <>  
        <div className='w-full h-auto flex justify-between' id='adminDiv'>
        <div className='bg-blue-900 w-1/2 h-screen fixed flex flex-col items-center' id='adminDiv1'>
          <Link to='/' className='self-start text-gray-300 opacity-40 hover:text-gray-100 p-3' onClick={() => navigate(-1)}>&lt;--</Link>
          <img src="/logo.png" width={700} height={400} alt="logo picture" id='logo'/>
        </div>
        <div className='flex flex-col items-center w-1/2 px-10 ml-auto' id='adminDiv2'>
        <h1 className='text-4xl md:text-5xl py-8 font-bold'>Admin page</h1>
        <form className='m-10 px-10' onSubmit={(e) => submitArticle(e)}>
          <fieldset className='border rounded-lg border-gray-400 p-4 md:p-10 flex flex-col gap-5 items-center bg-gray-100'>
            <legend className='text-center text-4xl md:text-5xl font-semibold font-serif'>
              Upload article
            </legend>
            <input className='bg-gray-100 border border-gray-500 p-1 rounded-lg w-full' type="text" placeholder='Add a catchy title' onChange={(e) => setTitle(e.target.value)} />
            <textarea className='bg-gray-100 border border-gray-500 p-1 rounded-lg w-full overflow-y-auto' placeholder='Content' onChange={(e) => setContent(e.target.value)} />
            <div className='flex gap-20'>
                <label className='text-lg font-semibold'>Alege o categorie: </label>
                <select name="categories" defaultValue="categorie" className='p-1 rounded-lg border border-gray-400' onChange={(e) => setCategory(e.target.value)} >
                    <option value="categorie" disabled>Categorie</option>
                    <option value="politica">Politică</option>
                    <option value="economie">Economie</option>
                    <option value="infrastructura">Infrastructură</option>
                    <option value="sanatate">Sănătate</option>
                    <option value="tragedii">Tragedii</option>
                </select>
            </div>
            <div className='text-center'>
                <h1 className='text-lg font-semibold pb-1'>Image:</h1>
                <input type="file" accept='image/*' className='bg-gray-100 border border-gray-500 p-1 rounded-lg' onChange={(e) => {
                  if(e.target.files && e.target.files[0]){setImage(e.target.files[0])}
                }} />  
            </div>        
            <p className='text-red-500 text-md font-bold'>{uploadError}</p>
            <p className='text-green-500 text-md font-bold'>{uploadSuccess}</p>
            {isUploadActive ? <button type='submit' disabled className='bg-green-900 text-white rounded-xl p-1 w-full text-md'>În curs de publicare...</button> :
            <button type='submit' className='bg-green-700 text-white hover:bg-green-600 rounded-xl p-1 w-full text-md'>Publică articol</button>}
          </fieldset>
        </form>
      </div> 
      </div>
      <div className='flex flex-col items-center w-1/2 ml-auto my-20' id='deleteDiv'>
      <form onSubmit={(e) => deleteArticle(e)}>
          <fieldset className='border rounded-lg border-gray-400 p-6 md:p-10 flex flex-col gap-5 items-center bg-gray-100'>
            <legend className='text-center text-4xl md:text-5xl font-semibold font-serif'>
              Delete Article
            </legend>
            <input className='bg-gray-100 border border-gray-500 p-1 rounded-lg w-full' type="search" required placeholder='Search article (by title)' onChange={(e) => setDeleteQuery(e.target.value)} />      
            <p className='text-red-500 text-md font-bold'>{deleteError}</p>
            <p className='text-green-500 text-sm font-bold'>{deleteSuccess}</p>
            {isDeleteActive ? <button type='submit' disabled className='bg-red-900 text-white rounded-xl p-1 w-full text-md'>În curs de ștergere...</button> :
            <button type='submit' className='bg-red-700 text-white hover:bg-red-600 rounded-xl p-1 w-full text-md'>Șterge articol</button>}
          </fieldset>
        </form>
      </div>
    </>
  )
}
