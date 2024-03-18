import React from 'react';
import InfoPopover from './InfoPopover'; // Ensure this is imported correctly
import ServiceItemsTable from './ServiceItemsTable'; // Ensure this is imported correctly
import { ServiceItem } from '../models/ServiceItem';

// Define the types for the properties of the property object
interface Property {
  repair_cost_min?: number;
  repair_cost_max?: number;
  service_items?: ServiceItem[]; // Define ServiceItem type according to your data structure
}

// Define the type for the component props
interface RepairCostEstimateProps {
  property: Property;
}

// Assuming currencyFormat is defined elsewhere, and should be imported
const currencyFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const RepairCostEstimate: React.FC<RepairCostEstimateProps> = ({ property }) => {
  return (
    <div className="h-full md:border-l md:border-b-0 md:border-t-0 border-b border-t border-gray-300 border-solid w-full text-center pb-5 lg:px-5 px-1">
      <div className="border-b border-gray-300 border-solid pb-4">
        <h3 className="lg:text-2xl text-xl font-bold my-4 md:mt-0 text-center w-full mr-2">
          Total Repair Cost Estimate
          <InfoPopover
            title="How do we calculate this?"
            content="We calculate our repair estimates using data from the land bank, as well as our own market data for materials and labor prices."
            side="top"
          />
        </h3>
        <h4 className="lg:text-xl text-lg font-semibold text-center text-green-700">
          {property.repair_cost_min ? currencyFormat.format(property.repair_cost_min) : 'N/A'} - 
          {property.repair_cost_max ? currencyFormat.format(property.repair_cost_max) : 'N/A'}
        </h4>
      </div>
      {property.service_items && property.service_items.length > 0 && (
        <ServiceItemsTable serviceItems={property.service_items} />
      )}
    </div>
  );
};

export default RepairCostEstimate;
