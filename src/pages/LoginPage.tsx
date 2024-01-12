import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
    });
  };

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };
 

  const navigate = useNavigate()


  return (
    <section className="flex flex-col my-8 md:flex-row h-screen max-md:h-fit items-center">

      <div className=" mx-7 xl:m-auto block max-md:hidden  w-1/2 flex flex-col justify-center col-span-1 text-left lg:text-start">
          <div className="flex items-start mb-4 lg:justify-normal">
            <img className="h-5 rounded-lg hidden lg:block" src="/map_medium.png" alt="logo" />
            <h4 className="ml-2 text-sm font-bold tracking-widest text-primary uppercase">Explore the latest vacant land and rehab opportunites</h4>
          </div>
          <h1 className="mb-8 text-4xl font-extrabold leading-tight lg:text-6xl text-dark-grey-900"> <span className="text-[#8ba2be]">Flint </span> Property Search</h1>
          <p className="mb-6 text-base font-normal leading-7 lg:w-3/4 text-grey-900">
            Our mission is to restore value to the community by making Flint's abandoned land & properties easy to locate and acquire in cooperation with stakeholders who value responsible land ownership.
          </p>
          <p className="mb-6 text-xs font-semibold leading-7 lg:w-3/4 text-grey-900">
            **Disclaimer: Flint Propterty Search is in no way affiliated with the Genesee County Land Bank. This is a independent project for the purpose of showcasing the properties available for purchase in the City of Flint.**
          </p>
          {/* <div className="flex items-center gap-4 flex-row ">
            <Link to="/search" className="flex items-center md:py-4 py-3 px-5 text-xs sm:text-sm font-bold text-white bg-gradient-to-br from-[#8ba2be] to-[#A9A9A9] focus:ring-4 shadow-lg hover:scale-105 focus:bg-purple-100 transition duration-300 rounded-xl">Find Properties</Link>
            <Link to='/contact' className="flex items-center py-4 text-xs sm:text-sm font-medium px-7 text-dark-grey-700 hover:text-dark-grey-900 transition duration-300 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd"></path>
              </svg>
              Contact Us
            </Link>
          </div> */}
      </div>
      <div className="block max-md:hidden my-6 border-l border-gray-300 h-full w-[1px]" />


      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen max-md:h-fit px-6 lg:px-16 xl:px-12
        flex items-center justify-center">

        <div className="w-full h-100">


          <h1 className="text-xl text-center md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>

          <div className="mt-6" >

            <button onClick={handleLogin} className="mb-5 w-full block bg-white hover:bg-[#8ba2be] hover:text-white hover:border-[#8ba2be] border-2 border-black transition ease-in-out duration-200 text-black font-semibold rounded-lg
              px-4 py-3 mt-6">Log In with Email</button>
          </div>
          <hr className="my-6 border-gray-300 w-full" />
          <button onClick={handleLogin} className="w-full block bg-[#8ba2be] hover:bg-gray-500 transition ease-in-out duration-200 text-white font-semibold rounded-lg
              px-4 py-3 mt-6">Sign Up
          </button>


        </div>
      </div>

    </section>
  )
}

export default LoginPage