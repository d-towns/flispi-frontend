import React, { useEffect, useState } from "react";
import ImageCarousel from "../components/ImageCarousel";
import { Link } from "react-router-dom";
import { Property } from "../models/Property.model";
import GridItem from "../components/GridItem";
import { fetchFeaturedProperties } from '../services/property.service';
import { fetchBlogs } from "../services/blog.service";
import { Blog } from "../models/Blog.model";

import { format, parseISO } from "date-fns";
import CountyStats from "../components/CountyStats";


const HomePage = () => {


  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const fetchFeaturedData = async () => {
    setIsLoading(true);
    const response = await fetchFeaturedProperties();
    setFeaturedProperties(response.properties);
    setIsLoading(false);
  };

  const fetchBlogData = async () => {
    const response = await fetchBlogs();
    setBlogs(response);
  }

  useEffect(() => {
    fetchFeaturedData();
    fetchBlogData();
  }, []);

  return (
    <>
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
      <div
        className="absolute inset-x-10 top-[-50rem] -z-30 transform-gpu overflow-hidden blur-3xl sm:top-[20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr to-[#8ba2be] from-[#003366] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div
        className="absolute inset-x-0 top-[-50rem] -z-30 transform-gpu overflow-hidden blur-3xl sm:top-[130rem]"
        aria-hidden="true"
      >
        <div
          className="relative -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr to-[#8ba2be] from-[#003366] opacity-30 sm:left-[calc(100%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="grid xl:m-auto xl:w-[1500px] w-full grid-cols-1 my-auto mt-12 mb-8 md:grid-cols-2 xl:gap-14 pr-8">
        <div className="mx-10 flex flex-col justify-center col-span-1 text-left lg:text-start" data-aos="fade-up" data-aos-duration="1000">
          <div className="flex items-start mb-4 lg:justify-normal">
            <img className="h-5 rounded-lg hidden lg:block" src="/map_medium.png" alt="logo" />
            <h4 className="ml-2 text-sm font-bold tracking-widest text-primary uppercase">Explore the latest vacant land and rehab opportunites</h4>
          </div>
          <h1 className="mb-8 text-4xl font-extrabold leading-tight lg:text-6xl text-dark-grey-900"> <span className="text-[#8ba2be]">Flint </span> Property Search</h1>
          <p className="mb-6 text-lg font-normal leading-7 lg:w-3/4 text-grey-900">
            Our mission is to restore value to the community by making Flint's abandoned land & properties easy to locate and acquire in cooperation with stakeholders who value responsible land ownership.
          </p>
          <p className="mb-6 text-xs font-semibold leading-7 lg:w-3/4 text-grey-900">
            **Disclaimer: This is an independent project. This is not the official Genesee County Land Bank website -- you can find that  <a href="www.thelandbank.org" className="underline">here</a>**
          </p>
          <div className="flex items-center gap-4 flex-row ">
            <Link to="/search?featured=true" className="flex items-center md:py-4 py-3 px-5 text-xs sm:text-sm font-bold text-white bg-gradient-to-br from-[#8ba2be] to-[#A9A9A9] focus:ring-4 shadow-lg hover:scale-105 focus:bg-purple-100 transition duration-300 rounded-xl">Find Properties</Link>
            <Link to='/contact' className="flex items-center py-4 text-xs sm:text-sm font-medium px-7 text-dark-grey-700 hover:text-dark-grey-900 transition duration-300 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd"></path>
              </svg>
              Contact Us
            </Link>
          </div>
        </div>
        <div data-aos="fade-up" data-aos-duration="1000">
          <ImageCarousel />
        </div>
      </div>
      <div className="bg-transparent w-full pt-8 my-10 sm:my-24 sm:pt-16 ">
        <div className="mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 max-xl:grid-cols-1 gap-x-8 gap-y-16">
            <div className="hidden xl:block">
              <CountyStats />
            </div>
            <div className="pl-7 xl:mt-20">
              <h2 className="mb-4 text-3xl font-extrabold leading-tight text-left lg:text-5xl text-dark-grey-900"> Genesee County Land Bank is taking action!</h2>
              <h3 className="mb-8 text-lg leading-tight font-semibold text-left lg:text-2xl text-dark-grey-900 mb-20"> 10,000+ Affordable Properties For Sale</h3>
              <p className=" w-full mb-10 lg:text-xl text-lg font-normal text-left leading-7 text-grey-900 ">
                The Genesee County Land Bank is a government organization that manages tax-foreclosed properties in Genesee County.
              </p>
              <ul className="list-disc pl-5 space-y-2 lg:text-lg text-base">
                <li>Every year they receive a new inventory of tax-foreclosed properties.</li>
                <li>The County forecloses on these properties after years of unpaid taxes. The Land Bank then works to put these properties back into productive use.</li>
                <li>This includes selling and renting out properties, managing blight, greening, and revitalizing the neighborhoods that surround those properties.</li>
              </ul>
            </div>
            <div className="xl:hidden block">
            <CountyStats />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 mx-auto py-16 sm:py-32 text-sm">
        <div className="mx-auto xl:max-w-[100rem] px-6 lg:px-8">
          <div className="mx-auto max-w-4xl lg:text-center" data-aos="fade-up" data-aos-duration="1000">
            <h2 className="sm:text-xl text-base font-semibold leading-7 text-[#8ba2be]">Flint Property Search</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">Featued properties of the week </p>
            <p className="mt-6 mx-autos sm:text-xl text-lg sm:leading-relaxed text-gray-600">The Genesee County Land Bank works with partners to address challenges on tax-foreclosed properties received from the Genesee County Treasurer and position them for re-use when feasible. Some of the best available are listed below:</p>
          </div>
          <div className="mx-auto w-full mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-none w-full grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 xl:max-w-none xl:grid-cols-4 lg:gap-y-16">
              {isLoading ?
                <div className="relative">
                  <div className="w-20 h-20 border-purple-200 border-2 rounded-full"></div>
                  <div className="w-20 h-20 border-purple-700 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
                </div> :
                featuredProperties.map((property, idx) => (
                  <div key={property.id} data-aos="fade-right" data-aos-duration={`${300 * (idx + 1)}`}>
                    <GridItem property={property} />
                  </div>
                ))}
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-transparent py-24  max-w-7xl mx-auto sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0" data-aos="fade-up" data-aos-duration="1000">
            <h2 className="font-bold tracking-tight text-gray-900 sm:text-4xl text-2xl">Check Out Our Blog!</h2>
            <p className="mt-2 sm:text-lg  text-base leading-8 text-gray-600">Learn how you can get involved in mission to activate vacant land, promote affordable homeownership and fight blight</p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {blogs.map((blog) => {
              return (
                <article key={blog.slug} className="flex max-w-xl flex-col items-start justify-between" data-aos-duration="500" data-aos="fade-in">
                  <div className="flex items-center gap-x-4 text-xs">
                    <span className="text-gray-500">{format(parseISO(blog.created_at), 'yyyy-MM-d')}</span>
                    <a href={`blog/${blog.slug}`} className="relative z-10 rounded-full bg-gray-100 shadow px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{blog.tag}</a>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <a href={`blog/${blog.slug}`}>
                        <span className="absolute inset-0"></span>
                        {blog.title}
                      </a>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{blog.subtitle}</p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <img src="DT_BULB_DARK.png" alt="" className="h-16 w-16 rounded-full bg-gray-50" />
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900 text-lg">
                        <span >
                          <span className="absolute inset-0 text-xl"></span>
                          {blog.author}
                        </span>
                      </p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
      <>
        <div className="relative mx-auto flex max-w-6xl flex-col gap-y-4 mb-32 hidden sm:block px-8" data-aos="fade-up" data-aos-duration="1000">
          <div className="absolute xl:right-1 left-5 top-3 h-full xl:w-[94%] rounded-lg bg-[#8ba2be] z-0 w-[90%]"></div>
          <dd className="relative border  border-black flex flex-row sm:gap-8 order-first z-10 mb-4 rounded-lg bg-white p-6 text-3xl font-semibold tracking-tight text-gray-900 shadow-md sm:text-5xl">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">Subscribe to our newsletter!</h2>
              <p className="mt-4 text-lg leading-8 text-black">Recieve new featured and ready for rehab properties sent to your inbox every Friday.</p>
              <div className="mt-6 flex max-w-md gap-x-4">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                {subscribed ? <p className=" text-lg text-green-500">Thank you for subscribing!</p> :
                  <>
                    <input id="email-address" name="email" type="email" autoComplete="email" required className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-black shadow-md ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Enter your email" />
                    <button type="submit" onClick={() => setSubscribed(true)} className="flex-none rounded-md transition duration-300 bg-gradient-to-br from-[#8ba2be] to-[#A9A9A9] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Subscribe</button>
                  </>
                }
              </div>
            </div>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2 text-sm">
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                  </svg>
                </div>
                <dt className="mt-4 font-semibold text-black">Weekly updates</dt>
                <dd className="mt-2 leading-7 text-gray-400">Detailed property information along with showing times and application information.</dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
                  </svg>
                </div>
                <dt className="mt-4 font-semibold text-black">No spam</dt>
                <dd className="mt-2 leading-7 text-gray-400">We will only contact you with property information, and you are able to unsubscribe at any time</dd>
              </div>
            </dl>
          </dd>
        </div>
      </>
    </>
  )
}

export default HomePage