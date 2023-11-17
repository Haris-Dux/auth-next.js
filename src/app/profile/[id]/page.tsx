


const UserProfilePage = ({params}:any) => {
  return (
    <div className="flex justify-center items-center h-screen ">
    <h1 className=" text-3xl bg-orange-400">user profile is 
    <span className=" text-3xl text-white bg-black">{params.id}</span>
    </h1>
  </div>
  )
}

export default UserProfilePage
