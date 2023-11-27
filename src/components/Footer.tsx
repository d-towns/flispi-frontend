import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-100 pt-2 pb-2">
    <div className="flex md:flex-row flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 py-8 w-full">
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-700">Our Mission</h2>
                <p className="text-gray-500 text-base">
                Our mission is to restore value to the community by making Flint's abandoned land & properties easy to locate and acquire in cooperation with stakeholders who value responsible land ownership..
                </p>
                <p className='w-full text-xl font-bold text-gray-700'> Follow Us </p>
                <div className="flex mx-3">
                    <a href="#" className="text-gray-400 hover:text-gray-500 mx-4 ">
                    <i className="bi bi-facebook text-4xl"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-500 mx-4">
                    <i className="bi bi-youtube text-4xl"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-500 mx-4 ">
                    <i className="bi bi-twitter text-4xl"></i>
                    </a>  
                </div>
            </div>
            <div className="lg:col-span-1 mt-10 sm:mt-0">
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-2">
                    <div>
                        <h3 className="text-gray-700 text-xl mt-6 font-semibold tracking-wider">
                            More
                        </h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                                    Board
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                                    Contracts/Bids
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                                    Jobs
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <img className="mx-auto mb-8 max-w-[14em] mt-10 rounded-lg h-[20%]" src="/DT_BULB_DARK.png" alt="Company Logo" />
    </div>
</footer>
    )
}

export default Footer