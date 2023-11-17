"use client"
import axios from 'axios';
import Link from 'next/link';
import React , {useState,useEffect} from 'react'

const VerifyEmailPage = () => {

    const [token,setToken] = useState('');
    const [verified,isVerified] = useState(false);

    const verifyEmail = async () => {
       try {
        await axios.post('/api/users/verifyEmail',{token});
       } catch (error:any) {
        console.log(error.message);
       }
    };
    useEffect(()=>{
      const urlToken = window.location.search.split("=")[1];
      setToken(urlToken)
    },[]);

    useEffect(()=>{
        if(token.length > 0 || ''){
            verifyEmail()
            isVerified(true);
        }
    },[token,verifyEmail])
  return (
    <div className='flex felx-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl'>Verify Email</h1>
      <h4 className='text-2xl bg-orange-500 text-black'>{token ? `${token}`: 'No Token'}</h4>
      {verified && <p className='bg-green-300 p-6 rounded-lg mt-8'>Your email has been verified</p>}
      <div>
        <Link href={'/login'}>Lgin Now</Link>
      </div>
    </div>
  )
}

export default VerifyEmailPage
