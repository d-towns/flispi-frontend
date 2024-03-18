import React, { useEffect, useState } from "react";
import './PropertyMap.css'
import { Loader } from '@googlemaps/js-api-loader';
import { Property } from "../../models/Property.model";
import { currencyFormat } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { parseImages } from "../../utils/utils";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import * as ScrollArea from "@radix-ui/react-scroll-area";

const loader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
  version: "weekly",
});

const mapOptions = {
  center: {
    lat: -25.344, lng: 131.031
  },
  zoom: 11
};

const PAGE_SIZE = 30;

interface PropertyMapProps {
  properties: Array<Property>;
  pageNumber: number;
  setPage: (pageNumber: number) => void;
  searchTotal: number;
  pageList: Array<number>;
}


const PropertyMap = ({ properties, searchTotal, setPage, pageList, pageNumber }: PropertyMapProps) => {

  const navigate = useNavigate();
  const [infoWindows, setInfoWindows] = useState<Array<{marker: google.maps.Marker, infoWindow:google.maps.InfoWindow}>>([]);
  const [map, setMap] = useState<google.maps.Map>();


  useEffect(() => {
    const setupMap = async () => {
      await loader.importLibrary('maps')
      await loader.importLibrary('marker')
      const map = new google.maps.Map(document.getElementById("map") as HTMLElement, mapOptions);
      setMap(map);
      const localInfoWindows = properties.map((property) => {
        let coords = property.coords
        let marker = new google.maps.Marker({
          position: { lat: coords?.lat, lng: coords?.lng },
          map: map,
          title: property.address,
        });
        const infoWindow = new google.maps.InfoWindow({
          content: `
                    <div class="rounded-lg shadow-lg bg-white p-4">
                        <div class="flex flex-col">
                            <div class="flex flex-row mt-2 text-lg justify-between">
                                <h1 class="font-bold mr-4">${property.address}</h1>
                            </div>
                            <p class="my-2 font-bold text-gray-400">${property.city}, ${property.zip}</p>
                             <span class="font-bold"> Parcel ID: <span class="text-gray-400">  ${property.parcel_id} </span> </span>
                            <a href="/property/${property.id}" class="text-sm mt-4 hover:bg-gray-300 transition ease-in-out duration-200 rounded-lg text-center p-3 bg-gray-100 font-bold ">View Property Details</a>
                        </div>
                    </div>
                    `,

          maxWidth: 400,
        });
        
        marker.addListener("click", () => {
          infoWindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
          });
        });
        return {marker, infoWindow}
      }); 
      setInfoWindows(localInfoWindows);
      const center = new google.maps.LatLng(properties[0].coords);
      map.setCenter(center);
    }

    setupMap();
  }, [properties]);

  const handleMouseEnter = (index: number) => {
    
    infoWindows[index].infoWindow.open({
      anchor: infoWindows[index].marker,
      map,
      shouldFocus: false,
    });

    infoWindows[index].marker.setAnimation(google.maps.Animation.BOUNCE);
  }

  const handleMouseLeave = (index: number) => {
    infoWindows[index].infoWindow.close();
    infoWindows[index].marker.setAnimation(null);
  }

  return (
    <>

      <div className="hidden xl:flex xl:flex-1 xl:items-center xl:justify-between mt-10">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{pageNumber === 0 ? 0 : pageNumber * PAGE_SIZE}</span> to <span className="font-medium">{(pageNumber + 1) * PAGE_SIZE > searchTotal ? searchTotal : (pageNumber + 1) * PAGE_SIZE}</span> of{' '}
            <span className="font-medium">{searchTotal}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => setPage(pageNumber - 1)}
              disabled={pageNumber === 0}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            {pageList.map((number) => {
              return (
                <button
                  key={"pgn-" + number}
                  onClick={() => setPage(number)}
                  disabled={searchTotal < PAGE_SIZE}
                  className="relative inline-flex items-center px-4 py-2 text-sm hover:bg-gray-200 font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                  style={
                    pageNumber === number - 1 ? { backgroundColor: '#003366', color: 'white' } : {}
                  }
                >
                  {number}
                </button>
              )
            })}
            <button
              onClick={() => setPage(pageNumber + 1)}
              disabled={searchTotal < PAGE_SIZE}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>

      <div className="grid grid-cols-3">
        <div className="mt-4 max-xl:hidden">
        <ScrollArea.Root className="h-[800px] rounded bg-transparent">
    <ScrollArea.Viewport className="w-full h-full rounded">
      <div className="py-[15px] px-5">
        {
            properties.length !== 0 ?

              properties.map((property, index) => {
                return (
                  <div className='flex items-center justify-center bg-transparent px-2 my-3'>
                    <div onMouseOver={() => handleMouseEnter(index)} onMouseLeave={() => handleMouseLeave(index)} className='border border-black border transform hover:scale-105 hover:cursor-pointer transition-all duration-300 hover:border-[#8ba2be] w-full max-w-md  mx-auto bg-gray-100 rounded-3xl shadow-xl overflow-hidden p-3'
                      onClick={() => navigate(`/property/${property.id}`)}
                    >
                      <div className="rounded-lg">
                        <div className="mt-4 grid flex items-center h-fit relative">
                          <div className="grid grid-cols-3">
                            <div className="col-span-2 mr-3">
                              <h2 className="text-base font-medium text-gray-800" title="New York">{property.address}</h2>
                              <p className="my-2 line-clamp-1 text-sm text-gray-800" title="New York, NY 10004, United States"><span className="font-semibold">Tax ID:</span> {property.parcel_id}</p>
                              {property.price ? <span className="text-sm block"><span className="">Price: </span>{currencyFormat.format(property.price)}</span> : <span className=" block">{'Price Negotiable'}</span>}
                            </div>
                            <div className="w-full h-auto transform transition-transform duration-500 rounded-lg ease-in-out">
                              {property.images?.length ? <img src={parseImages(property.images)[0]} className='w-full h-full' alt="" /> : <img src='/no_image_dark.jpeg' className='w-full h-full' alt="" />}
                            </div>
                          </div>
                          <div className="mt-2 grid grid-cols-4 grid-rows-1 gap-4 py-3 h-fit text-xs w-full">
                            <p className="flex items-center text-gray-800 xl:flex-row xl:items-center ">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                              </svg>

                              <span className="xl:mt-0"> {property.property_class} </span>
                            </p>
                            <p className="flex items-center text-gray-800 xl:flex-row xl:items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                              </svg>

                              <span className="mt-0"> {property.city} </span>
                            </p>
                            <p className="flex items-center text-gray-800 xl:flex-row xl:items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                              </svg>
                              <span className="mt-0">  {property.property_class?.includes('Lot') ? property.lot_size ? property.lot_size + ' acres' : 'N/A' : property.square_feet ? property.square_feet + ' sq. ft.' : 'N/A'}  </span>
                            </p>
                            <p className="flex items-center text-gray-800 xl:flex-row xl:items-center">
                              <svg className="mr-3 inline-block h-5 w-5 fill-current text-gray-800 xl:h-4 xl:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M532.01 386.17C559.48 359.05 576 325.04 576 288c0-80.02-76.45-146.13-176.18-157.94 0 .01.01.02.01.03C368.37 72.47 294.34 32 208 32 93.12 32 0 103.63 0 192c0 37.04 16.52 71.05 43.99 98.17-15.3 30.74-37.34 54.53-37.7 54.89-6.31 6.69-8.05 16.53-4.42 24.99A23.085 23.085 0 0 0 23.06 384c53.54 0 96.67-20.24 125.17-38.78 9.08 2.09 18.45 3.68 28 4.82C207.74 407.59 281.73 448 368 448c20.79 0 40.83-2.41 59.77-6.78C456.27 459.76 499.4 480 552.94 480c9.22 0 17.55-5.5 21.18-13.96 3.64-8.46 1.89-18.3-4.42-24.99-.35-.36-22.39-24.14-37.69-54.88zm-376.59-72.13l-13.24-3.05-11.39 7.41c-20.07 13.06-50.49 28.25-87.68 32.47 8.77-11.3 20.17-27.61 29.54-46.44l10.32-20.75-16.49-16.28C50.75 251.87 32 226.19 32 192c0-70.58 78.95-128 176-128s176 57.42 176 128-78.95 128-176 128c-17.73 0-35.42-2.01-52.58-5.96zm289.8 100.35l-11.39-7.41-13.24 3.05A234.318 234.318 0 0 1 368 416c-65.14 0-122-25.94-152.43-64.29C326.91 348.62 416 278.4 416 192c0-9.45-1.27-18.66-3.32-27.66C488.12 178.78 544 228.67 544 288c0 34.19-18.75 59.87-34.47 75.39l-16.49 16.28 10.32 20.75c9.38 18.86 20.81 35.19 29.53 46.44-37.19-4.22-67.6-19.41-87.67-32.47zM233.38 182.91l-41.56-12.47c-4.22-1.27-7.19-5.62-7.19-10.58 0-6.03 4.34-10.94 9.66-10.94h25.94c3.9 0 7.65 1.08 10.96 3.1 3.17 1.93 7.31 1.15 10-1.4l11.44-10.87c3.53-3.36 3.38-9.22-.54-12.11-8.18-6.03-17.97-9.58-28.08-10.32V104c0-4.42-3.58-8-8-8h-16c-4.42 0-8 3.58-8 8v13.4c-21.85 1.29-39.38 19.62-39.38 42.46 0 18.98 12.34 35.94 30 41.23l41.56 12.47c4.22 1.27 7.19 5.62 7.19 10.58 0 6.03-4.34 10.94-9.66 10.94h-25.94c-3.9 0-7.65-1.08-10.96-3.1-3.17-1.94-7.31-1.15-10 1.4l-11.44 10.87c-3.53 3.36-3.38 9.22.54 12.11 8.18 6.03 17.97 9.58 28.08 10.32V280c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8v-13.4c21.85-1.29 39.38-19.62 39.38-42.46 0-18.98-12.35-35.94-30-41.23z"></path></svg>
                              {property.property_class?.includes('Lot') ?

                                <span className="mt-0"> {property.lot_size ? currencyFormat.format(Number((Number(property.price) / (Number(property.lot_size))).toFixed(2))) + ' / acre' : 'N/A'}</span> :
                                <span className="mt-0"> {property.square_feet ? currencyFormat.format(Number((Number(property.price) / Number(property.square_feet)).toFixed(2))) + ' / sq. ft.' : 'N/A'} </span>
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }) : null
          }
      </div>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar
      className="flex select-none touch-none p-0.5 bg-gray-300 transition-colors duration-[160ms] ease-out hover:bg-gray-400 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
      orientation="vertical"
    >
      <ScrollArea.Thumb className="flex-1 bg-gray-600 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Scrollbar
      className="flex select-none touch-none p-0.5 bg-gray-300 transition-colors duration-[160ms] ease-out hover:bg-gray-400 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
      orientation="horizontal"
    >
      <ScrollArea.Thumb className="flex-1 bg-gray-600  rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Corner className="bg-blackA5" />
  </ScrollArea.Root>
        </div>
        <div className="xl:col-span-2 xl:pl-5 col-span-3">
          <div id="map" style={{ height: "800px", width: "100%", marginTop: '1rem' }}></div>
        </div>
      </div>
      <div className="xl:hidden max-xl:flex max-xl:flex-1 max-xl:items-center max-xl:justify-between mt-10">
        <div className="flex flex-1 justify-between xl:hidden">
          <button
            onClick={() => setPage(pageNumber - 1)}
            disabled={searchTotal < PAGE_SIZE || (pageNumber === Math.ceil(searchTotal / PAGE_SIZE) - 1 || pageNumber === 0)}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>
          <div className="pt-3 px-3 text-center">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{pageNumber * PAGE_SIZE}</span> to <span className="font-medium">{(pageNumber + 1) * PAGE_SIZE > searchTotal ? searchTotal : (pageNumber + 1) * PAGE_SIZE}</span> of{' '}
              <span className="font-medium">{searchTotal}</span> results
            </p>
          </div>
          <button
            onClick={() => setPage(pageNumber + 1)}
            disabled={searchTotal < PAGE_SIZE || pageNumber === Math.ceil(searchTotal / PAGE_SIZE) - 1}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
      <div className="mt-4 max-xl:block hidden max-xl:grid max-xl:grid-rows-2 max-xl:grid-cols-2 max-md:grid-rows-4 max-md:grid-cols-1">
      
      </div>
    </>
  );
}

export default PropertyMap;