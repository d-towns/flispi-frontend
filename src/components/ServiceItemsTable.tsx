import { ServiceItem } from "../models/ServiceItem";
import React from "react";
import * as ScrollArea from '@radix-ui/react-scroll-area';

interface ServiceItemsTableProps {
    serviceItems: ServiceItem[];
}

const ServiceItemsTable: React.FC<ServiceItemsTableProps> = ({ serviceItems }) => {
    const currencyFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <ScrollArea.Root className="h-[300px] rounded bg-transparent">
            <ScrollArea.Viewport className="w-full h-full rounded">
                <div>
                    <h3 className="font-bold mt-3 lg:text-xl text-base mb-4 text-center">Service Items</h3>
                    {serviceItems.length > 0 ? (
                        <table className="max-md:mb-10 w-full lg:text-base text-xs text-left border border-gray-700 border-solid rounded-full">
                            <thead className="bg-gray-300">
                                <tr>
                                    <th className="p-2">Name</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serviceItems.map((item, index) => (
                                    <tr key={item.name} className={`bg-${index % 2 === 0 ? 'gray-100' : 'gray-200'}`}>
                                        <td className="p-2">{item.name}</td>
                                        <td>{currencyFormat.format(item.min_price)} - {currencyFormat.format(item.max_price)} / {item.unit !== 1 ? item.unit : null} {item.unit_type.toLowerCase()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>None needed</p>
                    )}
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

    );
};

export default ServiceItemsTable;