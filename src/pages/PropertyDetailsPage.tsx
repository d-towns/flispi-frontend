import React, { useCallback, useState } from "react"
import { Property } from "../models/Property.model"
import { useParams } from 'react-router-dom';
import ImageGallery from "../components/ImageGallery";
import { currencyFormat, parseImages } from "../utils/utils";
import { parseISO, } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import * as Dialog from '@radix-ui/react-dialog';
import { XMarkIcon, HeartIcon } from '@heroicons/react/20/solid'
import { favoriteProperty, getSavedProperty, unfavoriteProperty, fetchProperty } from "../services/property.service";
import { useAuth0 } from "@auth0/auth0-react";
import { NotLoggedInDialog } from "../components/NotLoggedInDialog";
import CountdownTimer from "../components/CountdownTimer";
import RepairCostEstimate from "../components/RepairCostEstimate";

const PropertyDetailsPage = () => {

  const [property, setProperty] = useState<Property>()
  const [isFavorite, setIsFavorite] = useState(false)
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth0()
  const [openLoginDialog, setOpenLoginDialog] = useState(false)


  const fetchPropertyFromApi = useCallback(async () => {
    if (!id) return
    const response = await fetchProperty(id)
    setProperty(response.properties[0])
  }, [id])

  React.useEffect(() => {
    window.scrollTo(0, 0)
    fetchPropertyFromApi()
    if (!id || !user?.sub) return
    getSavedProperty(user.sub, id).then((response) => {
      setIsFavorite(response)
    })
  }, [user, id, fetchPropertyFromApi])

  const toggleFavorite = (property: Property) => {
    if (!user?.sub) {
      setOpenLoginDialog(true)
      return
    }

    isFavorite ?
      unfavoriteProperty(property.id, user.sub).then(() => {
        setIsFavorite(false)
      }) :
      favoriteProperty(property.id, user?.sub).then(() => {
        setIsFavorite(true)
      })
  }

  const navigateToApplication = (property?: Property) => {
    switch (property?.property_class) {
      case 'Com Imp' || 'Com Vac Lot':
        window.location.href = 'https://www.thelandbank.org/downloads/commercial_application_221006.pdf'
        break
      case 'Res Imp':
        window.location.href = 'https://www.thelandbank.org/downloads/residential_interest_form_221006.pdf'
        break
      case 'Res Vac Lot':
        window.location.href = 'https://www.thelandbank.org/downloads/highest_and_best_offer_featured_vacant_lot_231114.pdf'
        break
      default:
        return null
    }
  }

  const findProperApplication = (property?: Property) => {
    switch (property?.property_class) {
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
      <div className=" xxl:w-3/4  mt-10 xxl:mx-auto px-10">
        <div className="grid xl:grid-cols-3 xl:grid-rows-1 grid-cols-1 grid-rows-auto gap-2 col-span-3 my-4 h-fit">
          <div className="lg:col-span-2 col-span-1 h-fit sm:h-full bg-white rounded-lg relative overflow-hidden my-10 sm:my-0">
            {property?.images ? <ImageGallery images={parseImages(property.images)} /> :
              <img src='/no_image_dark.jpeg'
                className="absolute inset-0 object-cover object-center w-full h-full"
                alt="Property Thumbnail" />
            }
          </div>
          <div className="bg-white border border-black shadow-lg rounded-lg h-full flex flex-col">
            <h1 className="text-3xl text-center font-semibold rounded-t-lg py-10 bg-gray-100">Property Details</h1>
            <div className="flex flex-col w-full">
              <div className="flex justify-items-start border-t borger-gray-100 px-5 justify-between  py-6 font-sans">
                <div className="flex flex-col ">
                  <span className="my-auto md:text-2xl text-lg font-semibold">{property?.address}</span>
                  <span className="my-auto">{property?.city}, {property?.zip}</span>
                  <span className="h-full" ></span>
                </div>
                <div>
                  <NotLoggedInDialog open={openLoginDialog} setOpen={setOpenLoginDialog} />
                  <button title="Save this property to your favorites" onClick={() => property && toggleFavorite(property)}>
                    <HeartIcon className={`h-12 w-12 text-gray-300 hover:text-red-200 hover:scale-110 transition ease-in-out duration-200 ${isFavorite && 'text-red-800 hover:text-red-200'}`} aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="flex w-full md:flex-row flex-col border-t border-b borger-gray-100 px-5 justify-between py-6 font-sans md:text-lg text-base">
                <div className="flex flex-col ">
                  <span className="max-md:flex max-md:w-2/3 max-sm:w-full max-md:justify-between mb-1"> <span className="font-bold">Tax ID:</span> {property?.parcel_id}</span>
                  <span className="max-md:flex max-md:w-2/3 max-sm:w-full  max-md:justify-between mb-1"><span className="font-bold">Property Class: </span> {property?.property_class}</span>
                  <span className="max-md:flex max-md:w-2/3  max-sm:w-full max-md:justify-between mb-1"><span className="font-bold">Price:</span> {property?.price ? currencyFormat.format(property.price) : 'Price Negotiable'}</span>
                  {!property?.property_class.includes('Lot') && <span className="max-md:flex max-sm:w-full  max-md:w-2/3 max-md:justify-between"><span className="font-bold">Square Feet:</span> {property?.square_feet}</span>}
                </div>
                <div className="flex flex-col">
                  <span className="max-md:flex max-md:w-2/3  max-sm:w-full max-sm:w-full  max-md:justify-between mb-1"><span className="font-bold">Lot Size:</span> {property?.lot_size ?? 'N/A'}</span>
                  <span className="max-md:flex max-md:w-2/3 max-sm:w-full  max-md:justify-between mb-1"><span className="font-bold">Year Built:</span> {property?.year_built ?? 'N/A'}</span>
                  {!property?.property_class.includes('Lot') &&

                    (<> <span className="max-md:flex max-md:w-2/3 max-sm:w-full max-md:justify-between mb-1"><span className="font-bold">Bedrooms:</span> {property?.bedrooms ?? 'N/A'}</span>
                      <span className="max-md:flex max-md:w-2/3 max-sm:w-full  max-md:justify-between mb-1"><span className="font-bold">Bathrooms:</span> {property?.bathrooms ?? 'N/A'}</span></>
                    )}
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full p-4 text-gray-800 gap-6">
              No property description available


              {property?.property_class.includes('Lot') && <p>No land contract offers accepted on vacant land. Please submit proof of funds and feasibility along with your offer form to the Genesee County Land Bank office. Documents can be faxed, emailed or hand delivered. Please follow-up with office to confirm the offer has been received.</p>}
              {property?.property_class.includes('Res Imp') &&
                <>
                  <h3 className="font-bold"> Ready for Rehab Purchase Process:</h3>
                  <ul>
                    <li className="mb-1"><strong>Step 1 – </strong>Show up to view the home during the listed open house hours and pick up an offer form at the open house</li>
                    <li className="mb-1"><strong>Step 2 – </strong>Gather proof of funds/income as detailed on the form</li>
                    <li className="mb-1"><strong>Step 3 – </strong> Submit your offer (see below for more details)</li>
                  </ul>
                </>
              }
              <p>
                <strong>**Note**</strong>
              </p>
              <p>All properties without a set price have a start at a minimum value of $3000.00, and are negotiable upon offer.</p>
            </div>
          </div>
        </div>
        <div className="grid xl:grid-cols-3 xl:grid-rows-1 grid-cols-1 grid-rows-auto gap-2 my-4 col-span-3 md:h-full h-fit">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="md:h-full h-fit rounded-lg bg-transparent data-[state=open]:opacity-100 relative overflow-hidden" >
                <div className="group relative m-0 flex md:h-full h-fit  w-full rounded-xl ring-gray-900/5 xl:mx-auto xl:max-w-lg">
                  <div className=" md:h-full h-fit w-full overflow-hidden rounded-xl border border-gray-200 opacity-40 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-90">
                    <img src="/keys_and_hand.jpeg" className="animate-fade-in block lg:h-full h-fit w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110" alt="" />
                  </div>
                  <div className="absolute text-left bottom-0 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                    <h1 className="font-serif text-2xl font-bold text-black">Interested in this Property?</h1>
                    <h1 className="text-sm font-light text-black">Click here Fill out an application now</h1>
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

                  This is a <span className="font-bold">{property?.property_class} </span> property, which means you need a <span className="font-bold"> {findProperApplication(property)} </span>to apply.

                  <p className="mt-5">If you are unsure on the details on how to apply to a purchase a home from the Genesee County Land Bank, please visit <a href="https://www.thelandbank.org/homeownership.asp" target="_blank" rel="noreferrer" className="text-blue-500">The Land Bank's home ownership guide</a> page for more information.</p>
                </Dialog.Description>
                <div className="mt-[25px] flex justify-center gap-5">
                  <button onClick={() => navigateToApplication(property)} className=" text-white transition duration-300 bg-gradient-to-br from-[#8ba2be] to-[#A9A9A9] hover:scale-105 transition focus:ring-gray-300 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                    Continue Applicaiton
                  </button>
                  <Dialog.Close asChild>
                    <button className="transition duration-300 bg-red-400 text-white hover:bg-red-600 hover:scale-105 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                      Close
                    </button>
                  </Dialog.Close>
                </div>
                <Dialog.Close asChild>
                  <button
                    className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                    aria-label="Close"
                  >
                    <XMarkIcon />
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          <div className="lg:col-span-2 col-span-1  lg:h-fit rounded-lg shadow-lg border border-black overflow-hidden">
            <h1 className="md:text-3xl  text-xl text-center  pl-8 font-semibold rounded-t-lg py-10 bg-gray-100 ">More Information</h1>
            <div className="grid md:grid-cols-2 grid-cols-1 w-full h-full p-4 text-gray-800 overflow-hidden">
              <div className="w-full h-full flex flex-col text-center px-4 ">
                <div className="border-b border-gray-300 border-solid pb-4 ">
                  <h3 className="text-2xl font-bold mt-3 md:mt-0  mb-4 text-center w-full ">Showtimes</h3>
                  <p className="text-xl font-semibold text-red-700 w-full text-center">{property?.next_showtime ? formatInTimeZone(parseISO(property.next_showtime), 'America/New_York', 'PP p') : 'None scheduled'}</p>
                </div>
                {property?.next_showtime &&
                  <div className="lg:py-10 pt-10 h-fit">
                    <CountdownTimer targetDate={property?.next_showtime ? parseISO(property.next_showtime) : new Date()} eventTitle={
                      `Property Showing at ${property?.address}, ${property?.city}, ${property?.zip}`
                    } />
                  </div>
                }
              </div>
              {property?.service_items.length ? 
              <RepairCostEstimate property={property} /> 
              : null}
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default PropertyDetailsPage