import React, { useState } from "react"
import { Property } from "../models/Property.model"
import { useParams } from 'react-router-dom';
import ImageGallery from "../components/ImageGallery";
import { currencyFormat, getEnvionmentApiUrl, parseImages } from "../utils/utils";
import { format, parseISO } from "date-fns";
import * as Dialog from '@radix-ui/react-dialog';
import {XMarkIcon} from '@heroicons/react/20/solid'

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

  const navigateToApplication = (property?:Property)  => {
    switch(property?.property_class) {
      case 'Com Imp' || 'Com Vac Lot':
        window.location.href = 'https://www.thelandbank.org/downloads/commercial_application_221006.pdf'
      case 'Res Imp':
        window.location.href = 'https://www.thelandbank.org/downloads/residential_interest_form_221006.pdf'
      case 'Res Vac Lot':
        window.location.href = 'https://www.thelandbank.org/downloads/lots_available_application_221006.pdf'
      default:
        return null
    }
  }

  const findProperApplication = (property?:Property) => {
    switch(property?.property_class) {
      case 'Com Imp' || 'Com Vac Lot':
        return 'Commercial Property Interest Application'
      case 'Res Imp':
        return 'Residential Property Interest Application'
      case 'Res Vac Lot':
        return 'Lots Available Application'
      default:
        return 'Application'
    }
  }

  return (
    <div>
      <div className=" w-3/4 mt-10 mx-auto">
        <div className="grid xl:grid-cols-3 xl:grid-rows-1 grid-cols-1 grid-rows-auto gap-2 col-span-3 my-4 h-fit">
          <div className="lg:col-span-2 col-span-1 h-fit sm:h-full bg-white rounded-lg relative overflow-hidden my-10 sm:my-0">
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
        <Dialog.Root>
    <Dialog.Trigger asChild>
    <button className="md:h-full h-fit bg-white rounded-lg shadow-lg data-[state=open]:opacity-100 relative overflow-hidden" >
            <div className="group relative m-0 flex md:h-full h-fit  w-full rounded-xl shadow-xl ring-gray-900/5 xl:mx-auto xl:max-w-lg">
              <div className=" md:h-full h-fit w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                <img src="/stock_deal.jpeg" className="animate-fade-in block lg:h-full h-fit w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110" alt="" />
              </div>
              <div className="absolute bottom-0 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                <h1 className="font-serif text-2xl font-bold text-white">Interested in this Property?</h1>
                <h1 className="text-sm font-light text-white">Click here Fill out an application now</h1>
              </div>
            </div>
          </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black data-[state=open]:opacity-25 fixed inset-0" />
      <Dialog.Content className="data-[state=open]:opacity-100 z-100 fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <Dialog.Title className="text-mauve12 m-0 text-[17px] text-xl font-medium">
          Fill out an application
        </Dialog.Title>
        <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
        This is a <span className="font-bold">{ property?.property_class } </span> property, which means you need a <span className="font-bold"> { findProperApplication(property) } </span>to apply.
        </Dialog.Description>
        <div className="mt-[25px] flex justify-center gap-5">
            <button onClick={ () => navigateToApplication(property)} className=" text-white transition duration-300 bg-gradient-to-br from-[#8ba2be] to-[#A9A9A9] hover:scale-105 transition focus:ring-gray-300 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
              Continue Applicaiton
            </button>
            <Dialog.Close asChild>
            <button className="transition duration-300 border-2 border-black hover:bg-red-200 hover:scale-105 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
              Close
            </button>
            </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button
            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
          <XMarkIcon/>
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
          
          <div className="lg:col-span-2 col-span-1  lg:h-fit rounded-lg shadow-lg border border-black overflow-hidden">
            <h1 className="text-2xl text-center  pl-8 font-semibold rounded-t-lg py-10 bg-gray-100 ">More Information</h1>
            <div className="flex flex-row w-full h-full p-4 text-gray-800 overflow-hidden">
              <div className="flex md:flex-row  flex-col gap-4 w-full h-full">
                <div className="md:h-full h-fit w-full text-center">
                  <h3 className="font-bold">Showtimes</h3>
                  <p>{ property?.next_showtime ? format(parseISO(property.next_showtime) , 	'PPPPpppp') : 'None scheduled' }</p>
                </div>
                <div className="md:border-r md:border-l md:border-b-0 md:border-t-0  border-b border-t border-gray-300 border-solid h-full w-full text-center">
                  <h3 className="font-bold mt-3 md:mt-0">Exterior Repairs</h3>
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