import { ServiceItem } from "../models/ServiceItem";
import React from "react";

interface ServiceItemsTableProps {
    serviceItems: ServiceItem[];
}

const ServiceItemsTable: React.FC<ServiceItemsTableProps> = ({ serviceItems }) => {
    const currencyFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <div>
            <h3 className="font-bold mt-3 lg:text-xl text-base mb-4 text-center">Service Items</h3>
            {serviceItems.length > 0 ? (
                <table className="mb-10 w-full lg:text-base text-xs text-left ">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {serviceItems.map((item) => (
                            <tr key={item.name}>
                                <td>{item.name}</td>
                                <td>{currencyFormat.format(item.min_price)} - {currencyFormat.format(item.max_price)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>None needed</p>
            )}
        </div>
    );
};

export default ServiceItemsTable;