import React, { useState } from "react"
import { Property } from "../models/Property.model"
import { useParams } from 'react-router-dom';
import ImageGallery from "../components/ImageGallery";
import { currencyFormat, getEnvionmentApiUrl, parseImages } from "../utils/utils";
import { format, parseISO } from "date-fns";

const PropertyDetailsPage = () => {

  const [property, setProperty] = useState<Property>()
  const { id } = useParams<{ id: string }>()


  const fetchProperty = async () => {
    const response = await fetch(getEnvionmentApiUrl() + `/properties/${id}`)
    const data = await response.json()
    setProperty(data)
  }

  React.useEffect(() => {
    fetchProperty()
  }, [])

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
                <span className="my-auto text-xl font-semibold">{property?.address}</span>
                <span className="my-auto">{property?.city}, {property?.zip}</span>
                <span className="h-full" ></span>
              </div>
              <div className="flex w-full flex-row border-t border-b borger-gray-100 px-5 justify-between py-6 font-sans">
                <div className="flex flex-col ">
                  <span> <span className="font-bold">PID:</span> {property?.parcel_id}</span>
                  <span><span className="font-bold">className: </span> {property?.property_class}</span>
                  <span><span className="font-bold">Price:</span> {property?.price ? currencyFormat.format(property.price) : 'Price Negotiable'}</span>
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
            No property description available
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
            <div className="flex flex-row w-full h-full p-4 text-gray-800 overflow-hidden">
              <div className="flex flex-row gap-4 w-full h-full">
                <div className="h-full w-full text-center">
                  <h3 className="font-bold">Showtimes</h3>
                  <p>{ property?.next_showtime ? format(parseISO(property.next_showtime) , 	'PPPPpppp') : 'None scheduled' }</p>
                </div>
                <div className="border-r border-l border-gray-300 border-solid h-full w-full text-center">
                  <h3 className="font-bold">Exterior Repairs</h3>
                  {property?.exterior_repairs ? <ul>{property.exterior_repairs.map((repair : string) => 
                    <li>{repair}</li>
                  )}</ul> : <p>None needed</p>}
                </div>
                <div className="h-full w-full text-center">
                  <h3 className="font-bold">Interior Repairs</h3>
                  {property?.interior_repairs ? <ul>{property.interior_repairs.map((repair : string) => 
                    <li>{repair}</li>
                  )}</ul> : <p>None needed</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default PropertyDetailsPage