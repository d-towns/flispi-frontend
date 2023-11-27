import React from 'react'
import { Link } from 'react-router-dom'

const BlogHome = () => {

  return (
<div className="text-gray-900 pt-12 pr-0 pb-14 pl-0 bg-white">
  <div className="w-full pt-4 pr-5 pb-6 pl-5 mt-0 mr-auto mb-0 ml-auto space-y-5 sm:py-8 md:py-12 sm:space-y-8 md:space-y-16
      max-w-7xl">
    <div className="flex flex-col items-center sm:px-5 md:flex-row">
      <div className="flex flex-col items-start justify-center w-full h-full pt-6 pr-0 pb-6 pl-0 mb-6 md:mb-0 md:w-1/2">
        <div className="flex flex-col items-start justify-center h-full space-y-3 transform md:pr-10 lg:pr-16
            md:space-y-5">
          <a className="text-4xl font-extrabold leading-none lg:text-5xl xl:text-7xl">FliSpi Real Estate Blog</a>
          <div className="pt-2 pr-0 pb-0 pl-0">
            <p className="text-base font-normal leading-6 text-gray-600">A place to find news and updates about the Flint real estate market, as well as information about the Genesee County Land Bank’s programs and properties.</p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <div className="block">
          <img
              src="/lb_4.jpeg" className="object-cover rounded-lg max-h-64 sm:max-h-96 btn- w-full h-full"/>
        </div>
      </div>
    </div>
    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <article className="flex max-w-xl flex-col items-start justify-between hover:scale-105 transition ease-in-out duration-200">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime="2020-03-16" className="text-gray-500">Mar 16, 2020</time>
                <a href="#" className="relative z-10 rounded-full bg-gray-100 shadow px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">Maintain Vacant Properties</a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href="#">
                    <span className="absolute inset-0"></span>
                    Clean & Green
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">The program began in 2004 as the Land Bank sought to partner with community-based organizations in order to advance community-based capacity, neighborhood health, youth engagement, the reuse of vacant land, and the Land Bank’s relationships with the community. Clean & Green is at the heart of the Land Bank’s community engagement. Block clubs, schools, churches, neighborhood associations and local non-profits are some of the roughly 100 community-based organizations who have participated in Clean & Green during more than a decade. Through the program, community-based groups seasonally maintain concentrated clusters of vacant properties. Each participating group receives a stipend for its maintenance work, much of which is used to employ local youth in improving their neighborhood conditions.</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img src="DT_BULB_DARK.png" alt="" className="h-16 w-16 rounded-full bg-gray-50" />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900 text-lg">
                    <a href="#">
                      <span className="absolute inset-0 text-xl"></span>
                      Dennis Towns
                    </a>
                  </p>
                </div>
              </div>
            </article>
            <article className="flex max-w-xl flex-col items-start justify-between hover:scale-105 transition ease-in-out duration-200">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime="2020-03-16" className="text-gray-500">Mar 16, 2020</time>
                <a href="#" className="relative z-10 rounded-full shadow bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">Maintain Vacant Properties</a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href="#">
                    <span className="absolute inset-0"></span>
                    Demolition Funding
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">The American Rescue Plan Act (ARPA) creates a unique opportunity to leverage funding from multiple sources to clear blight in neighborhoods. So far, we have secured $43.7 million: $16 million in ARPA from the City of Example City, $8 million in ARPA from the County, $10 million in grant funding from the Charles Stewart Mott Foundation, $4.5 million from the Land</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img src="DT_BULB_DARK.png" alt="" className="h-16 w-16 rounded-full bg-gray-50" />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900 text-lg">
                    <a href="#">
                      <span className="absolute inset-0 text-xl"></span>
                      Dennis Towns
                    </a>
                  </p>
                </div>
              </div>
            </article>
            <article className="flex max-w-xl flex-col items-start justify-between hover:scale-105 transition ease-in-out duration-200">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime="2020-03-16" className="text-gray-500">Mar 16, 2020</time>
                <a href="#" className="relative z-10 rounded-full bg-gray-100 shadow px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">Vacant Land</a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href="#">
                    <span className="absolute inset-0"></span>
                    Property Maintenance
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">The Land Bank’s seasonal crews mow grass and remove trash from vacant properties in Example City and Example County. We secure vacant properties by boarding windows and doors.</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img src="DT_BULB_DARK.png" alt="" className="h-16 w-16 rounded-full bg-gray-50" />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900 text-lg">
                    <a href="#">
                      <span className="absolute inset-0 text-xl"></span>
                      Dennis Towns
                    </a>
                  </p>
                </div>
              </div>
            </article>
          </div>
  </div>
</div>
  )
}

export default BlogHome
