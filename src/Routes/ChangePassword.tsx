import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ChangePassword() {

    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function checkResetToken(){
            try {
                const res = await fetch(`https://focus-news-backend-production.up.railway.app/valid/reset-token`,{
                    headers: {
                        "authorization": `Bearer ${token}`
                    }
                })

                if(!res.ok){
                    navigate('/login', {replace: true})
                }

            } catch (err: unknown) {
                if(err instanceof Error){
                    setError(err.message);
                }
            }
        }
        checkResetToken();
    }, []);


    async function resetPassword(e: React.FormEvent){
        setError('')
        setSuccess('');
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.API_ADRESS}/update-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({newPassword: newPassword, token: token})
            })
            
            const result = await res.json();

            if(res.status === 403){
                navigate('/login', {replace: true})
            }

            if(res.ok){
                setSuccess(result)
                setTimeout(() => {
                    navigate('/login', { replace: true})
                }, 2000)
            } else {
                setError(result)
            }
        } catch (err: unknown) {
            if(err instanceof Error){
                setError(err.message);
            }
        }
    }

  return (
    <>
        <div className='flex justify-center mt-5'>
            <form className='border-2 m-5 border-gray-200 rounded-lg p-10 flex flex-col items-center gap-2' onSubmit={(e) => resetPassword(e)}>
                <h1 className='text-center text-3xl font-semibold'>Reset your password</h1>
                <input type="password" required className='border-b outline-none border-gray-400 p-1' onChange={(e) => setNewPassword(e.target.value)} />
                <p className='text-red-500 text-sm font-bold'>{error}</p>
                <p className='text-green-500 text-sm font-bold'>{success}</p>
                <button type='submit' className='bg-green-500 text-white hover:bg-green-400 rounded-xl p-1 w-full text-md'>Resetează</button>
            </form>
        </div>
    </>
  )
}
