import React, { useState } from "react"
import { Property } from "../models/Property.model"
import { useParams } from 'react-router-dom';
import ImageGallery from "../components/ImageGallery";

const PropertyDetailsPage = () => {

  const [property, setProperty] = useState<Property>()
  const { id } = useParams<{ id: string }>()


  const fetchProperty = async () => {
    const response = await fetch(`http://localhost:4000/properties/${id}`)
    const data = await response.json()
    setProperty(data)
  }

  React.useEffect(() => {
    fetchProperty()
  }, [])

  const parseImages = (images: string) : string[] => {
    const imagesArray = ['']
    const parsedImages = JSON.parse(images).replace(/\\/g, '').replace(/"/g, '').replace('[', '').replace(']', '').split(',')
    return Array.from(parsedImages)
  }


  return (
    <div>
      <div className=" w-3/4 mt-10 mx-auto">
        <div className="grid xl:grid-cols-3 xl:grid-rows-1 grid-cols-1 grid-rows-auto gap-2 col-span-3 my-4 h-fit">
          <div className="lg:col-span-2 col-span-1 h-fit sm:h-full bg-white rounded-lg relative overflow-hidden my-10 sm:my-0 mx-10">
            {property?.images ? <ImageGallery images={parseImages(property.images)} /> :
              <img src='/no_image_dark.jpeg'
                className="absolute inset-0 object-cover object-center w-full h-full"
                alt="Property Thumbnail" />
            }
          </div>
          <div className="bg-white border border-black shadow-lg rounded-lg h-full flex flex-col">
            <h1 className="text-2xl text-center font-semibold rounded-t-lg py-10 bg-gray-100">Property Details</h1>
            <div className="flex flex-col w-full">
              <div className="flex w-full flex-col border-r border-t border-b borger-gray-100 px-5 justify-between  py-6 font-sans">
                <span className="my-auto text-lg">{property?.address}</span>
                <span className="my-auto">{property?.city}, {property?.zip}</span>
                <span className="h-full" ></span>
              </div>
              <div className="flex w-full flex-row border-t border-b borger-gray-100 px-5 justify-between py-6 font-sans">
                <div className="flex flex-col ">
                  <span> <span className="font-bold">PID:</span> {property?.parcel_id}</span>
                  <span><span className="font-bold">className: </span> {property?.property_class}</span>
                  <span><span className="font-bold">Price:</span> {property?.price ? property.price : 'Price Negotiable'}</span>
                  <span><span className="font-bold">Square Feet:</span> {property?.square_feet}</span>
                </div>
                <div className="flex flex-col">
                  <span><span className="font-bold">Lot Size:</span> {property?.lot_size ?? 'N/A'}</span>
                  <span><span className="font-bold">Year Built:</span> {property?.year_built ?? 'N/A'}</span>
                  <span><span className="font-bold">Bedrooms:</span> {property?.bedrooms ?? 'N/A'}</span>
                  <span><span className="font-bold">Bathrooms:</span> {property?.bathrooms ?? 'N/A'}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full p-4 text-gray-800">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </div>
          </div>
        </div>
        <div className="grid xl:grid-cols-3 xl:grid-rows-1 grid-cols-1 grid-rows-auto gap-2 my-4 col-span-3 md:h-full h-fit">
          <div className="md:h-full h-fit bg-white rounded-lg shadow-lg relative overflow-hidden">
            <div className="group relative m-0 flex md:h-full h-fit  w-full rounded-xl shadow-xl ring-gray-900/5 xl:mx-auto xl:max-w-lg">
              <div className="z-10 md:h-full h-fit w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                <img src="/stock_deal.jpeg" className="animate-fade-in block lg:h-full h-fit w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110" alt="" />
              </div>
              <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                <h1 className="font-serif text-2xl font-bold text-white">Interested in this Property?</h1>
                <h1 className="text-sm font-light text-white">Click here Fill out an application now</h1>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 col-span-1 h-[400px] lg:h-fit rounded-lg shadow-lg border border-black overflow-hidden">
            <h1 className="text-2xl text-left pl-8 font-semibold rounded-t-lg py-10 bg-gray-100 ">More Information</h1>
            <div className="flex flex-row w-full p-4 text-gray-800 overflow-hidden">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
            </div>
          </div>
        </div>
        {/* <div className="grid grid-cols-1 grid-rows-1 gap-2 my-4 col-span-3 h-[400px]">
          <div className="relative mx-auto flex flex-col gap-y-4 mb-32">
            <div className="absolute right-2 bottom-6 h-3/4 w-full rounded-lg bg-[#8ba2be] z-0"></div>
            <dd className="relative border  border-black flex flex-row sm:gap-8 order-first z-10 mb-4 rounded-lg bg-white p-6 text-3xl font-semibold tracking-tight text-gray-900 shadow-md sm:text-5xl">
              <div className="max-w-xl lg:max-w-lg">
                <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">Subscribe to our newsletter.</h2>
                <p className="mt-4 text-lg leading-8 text-black">Nostrud amet eu ullamco nisi aute in ad minim nostrud adipisicing velit quis. Duis tempor incididunt dolore.</p>
                <div className="mt-6 flex max-w-md gap-x-4">
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <input id="email-address" name="email" type="email" autoComplete="email" required className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-black shadow-md ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Enter your email" />
                  <button type="submit" className="flex-none rounded-md transition duration-300 bg-gradient-to-br from-[#8ba2be] to-[#A9A9A9] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Subscribe</button>
                </div>
              </div>
              <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2 text-sm">
                <div className="flex flex-col items-start">
                  <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                    <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                    </svg>
                  </div>
                  <dt className="mt-4 font-semibold text-black">Weekly articles</dt>
                  <dd className="mt-2 leading-7 text-gray-400">Non laboris consequat cupidatat laborum magna. Eiusmod non irure cupidatat duis commodo amet.</dd>
                </div>
                <div className="flex flex-col items-start">
                  <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                    <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
                    </svg>
                  </div>
                  <dt className="mt-4 font-semibold text-black">No spam</dt>
                  <dd className="mt-2 leading-7 text-gray-400">Officia excepteur ullamco ut sint duis proident non adipisicing. Voluptate incididunt anim.</dd>
                </div>
              </dl>
            </dd>
          </div>
        </div> */}
      </div>
    </div>

  )
}

export default PropertyDetailsPage