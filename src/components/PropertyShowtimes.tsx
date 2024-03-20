import React from "react";
import { Property } from "../models/Property.model";
import { parseISO, } from "date-fns";
import CountdownTimer from "../components/CountdownTimer";

interface PropertyShowtimesProps {
    property: Property | undefined;
}

const PropertyShowtimes = ({property} : PropertyShowtimesProps) => {
    return (
        <div className="w-full h-full flex flex-col text-center px-4 ">
        <div className="border-b border-gray-300 border-solid pb-4 ">
          <h3 className="text-2xl font-bold mt-3 md:mt-0  mb-4 text-center w-full ">Showtimes</h3>
          <p className="text-xl font-semibold text-red-700 w-full text-center">{property?.next_showtime ? parseISO(property.next_showtime).toLocaleDateString(
            'en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              timeZone: 'Europe/London'
            }
          ) : 'None scheduled'}</p>
        </div>
        {property?.next_showtime &&
          <div className="lg:py-10 pt-10 h-fit">
            <CountdownTimer targetDate={property?.next_showtime ? parseISO(property.next_showtime) : new Date()} eventTitle={
              `Property Showing at ${property?.address}, ${property?.city}, ${property?.zip}`
            } />
          </div>
        }
      </div>
    );
}

export default PropertyShowtimes;