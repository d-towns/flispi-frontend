import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { LockClosedIcon } from '@heroicons/react/24/outline';

const LoginPage = () => {
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

  return (
    <section className="flex flex-col my-8 md:flex-row h-screen max-md:h-fit items-center">
      <div
        className="absolute inset-x-10 top-[-50rem] -z-30 transform-gpu overflow-hidden blur-3xl sm:top-[-5rem]"
        aria-hidden="true"
        >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr to-[#8ba2be] from-[#003366] opacity-30 sm:left-[calc(120%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className=" mx-7 xl:m-auto block md:w-1/2 w-full px-10 flex flex-col justify-center col-span-1 text-left lg:text-start" data-aos="fade-up" data-aos-duration="1000">
          <div className="flex items-start mb-4 lg:justify-normal">
            <img className="h-5 rounded-lg hidden lg:block" src="/map_medium.png" alt="logo" />
            <h4 className="ml-2 text-sm font-bold tracking-widest text-primary uppercase">Explore the latest vacant land and rehab opportunites</h4>
          </div>
          <h1 className="mb-8 text-4xl font-extrabold leading-tight lg:text-6xl text-dark-grey-900"> <span className="text-[#8ba2be]">Flint </span> Property Search</h1>
          <p className="mb-6 text-lg md:block hidden font-normal leading-7 lg:w-3/4 text-grey-900">
            Our mission is to restore value to the community by making Flint's abandoned land & properties easy to locate and acquire in cooperation with stakeholders who value responsible land ownership.
          </p>
          <p className="mb-6  text-base font-normal leading-7 lg:w-3/4 text-grey-900"><LockClosedIcon className='w-6 h-6 inline'/> <strong>Secure Login with Auth0:</strong> We prioritize your security and privacy above all else. <a className="text-[#003366] hover:underline transition ease-in-out duration-200" href='https://auth0.com/'>Auth0</a> is a global leader in identity and access management, offering robust, adaptive security that protects your personal information.</p>
          <p className="mb-6 text-xs font-semibold leading-7 lg:w-3/4 text-grey-900">
            **Disclaimer: Flint Propterty Search is in no way affiliated with the Genesee County Land Bank. This is a independent project for the purpose of showcasing the properties available for purchase in the City of Flint.
            By creating an account, you agree to our <a className="text-[#003366] hover:underline transition ease-in-out duration-200" href='/terms'>Terms of Service</a> and <a className="text-[#003366] hover:underline transition ease-in-out duration-200" href='/policy'>Privacy Policy</a>
            **
          </p>
      </div>
      <div className="block max-md:hidden my-6 border-l border-gray-300 h-full w-[1px]" />


      <div className="bg-transparent w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen max-md:h-fit px-6 lg:px-16 xl:px-12
        flex items-center justify-center mb-32 mt-16">

        <div className="w-full h-100">


          <h1 className="text-xl text-center md:text-3xl font-bold leading-tight">Log in to your account</h1>
         

          <div className="mt-6" >

            <button onClick={handleLogin} className="mb-5 w-full block bg-white hover:bg-[#8ba2be] hover:text-white hover:border-[#8ba2be] border-2 border-black transition ease-in-out duration-200 text-black font-semibold rounded-lg
              px-4 py-3 mt-6">Log In with Email</button>
          </div>
          <hr className="my-6 border-gray-300 w-full" />
          <button onClick={handleSignUp} className="w-full block bg-[#8ba2be] hover:bg-gray-500 transition ease-in-out duration-200 text-white font-semibold rounded-lg
              px-4 py-3 mt-6">Sign Up
          </button>

          
        </div>
      </div>

    </section>
  )
}

export default LoginPage