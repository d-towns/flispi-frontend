// Initialize and add the map
import React, { useEffect } from "react";
import './PropertyMap.css'
import { Loader } from '@googlemaps/js-api-loader';
import { Property } from "../../models/Property.model";

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


interface PropertyMapProps {
    properties: Array<Property>;
}


const PropertyMap = ({properties} : PropertyMapProps) => {

    useEffect( () => {
        const setupMap = async () => {
        await loader.importLibrary('maps')
        await loader.importLibrary('marker')
        const map = new google.maps.Map(document.getElementById("map") as HTMLElement, mapOptions);
            Array.from(properties).forEach( (property) => {
                let coords = JSON.parse(property.coords);
                let marker = new google.maps.Marker({
                    position: {lat: coords?.lat, lng: coords?.lng},
                    map: map,
                    title: property.address
                });

                // create an infowindow for each marker with a clean rounded card design that has a address and city, zip and parcel id and a link to the property details page as well as a shadow
                
                const infowindow = new google.maps.InfoWindow({
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

                // add event listener to each marker
                marker.addListener("click", () => {
                    infowindow.open({
                        anchor: marker,
                        map,
                        shouldFocus: false,
                    });
                });
            });
            const center = new google.maps.LatLng(JSON.parse(properties[0].coords));
        map.setCenter(center);
        }

        setupMap();
    }, [properties]);
    
    return (
    <div>
    <div id="map" style={{ height: "800px", width: "100%" , marginTop: '50px'}}></div>
    </div>
    );
}

export default PropertyMap;