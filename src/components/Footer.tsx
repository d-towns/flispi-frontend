import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-100 pt-2 pb-2">
    <div className="flex md:flex-row flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 gap-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 py-8 w-full ">
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-700">Our Mission</h2>
                <p className="text-gray-500 text-base w-3/4">
                Our mission is to restore value to the community by making Flint's abandoned land & properties easy to locate and acquire in cooperation with stakeholders who value responsible land ownership.
                </p>
                <p className='w-full text-xl font-bold text-gray-700'> Social </p>
                <div className="flex">
                    <a href="https://twitter.com/dennis_exe_" className="text-gray-400 hover:text-gray-500 mr-4 ">
                    <i className="bi bi-twitter-x text-4xl"></i>
                    </a>  
                </div>
            </div>
            <div className="lg:col-span-1 mt-0">
                <div className="flex flex-col ">
                    <div>
                        <h3 className="text-gray-700 text-xl mt-6 font-semibold tracking-wider">
                            More
                        </h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <a href="/staff" className="text-base text-gray-500 hover:text-gray-900">
                                    Staff
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="text-base text-gray-500 hover:text-gray-900">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex flex-col text-center'>
        <img className="mx-auto max-w-[14em] mb-10 rounded-lg" src="/map_medium.png" alt="Company Logo" />
        <span className='text-lg my-1 ml-2 w-full font-semibold'><i>Flint Property Search</i></span>
        <span className='text-gray-600'> © Towns Captial-Flint LLC </span>
        </div>
    </div>
</footer>
    )
}

export default Footer