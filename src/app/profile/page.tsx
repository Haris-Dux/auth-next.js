"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


const ProfilePage = () => {
  const router = useRouter();
  const [data,setData] = useState('Nothing')
  const logout = async () => {
    try {
      await  axios.get("/api/users/logout");
      router.push("/login")
    } catch (error:any) {
      throw new Error(error.message)
    }
  };

  const getData = async () => {
   try {
    const res = await axios.get("/api/users/userData");
    setData(res.data._id)
    return res.data
   } catch (error:any) {
    console.log(error.message);
   }
  }
  return (
    <>
    <div className="flex justify-center">{data === 'Nothing' ? 'Nothing' : <Link href={`/profile/${data}`}>See Info</Link>}</div>
    <div className="flex justify-center items-center h-screen ">
      <h1 className=" text-3xl bg-orange-400">This is Main Profile Page</h1>
      
      <button  className="ml-4  font-extrabold hover:bg-slate-500" onClick={logout} >Logout</button>

      <button  className="ml-4 font-extrabold hover:bg-slate-500"  onClick={getData} >GET DATA</button>
    </div>
    </>
  )
}

export default ProfilePage
