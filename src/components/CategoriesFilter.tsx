import React from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Link } from 'react-router-dom';
import { subCategories, SubCategory } from '../utils/utils';
import usePropertySearch from '../hooks/usePropertySearch';

const CategoriesFilter = () => {

    const {setFilterParams} = usePropertySearch();

    const applyFilters = (filters: { [key: string]: string | string[] | number[] }) => {
        Object.entries(filters).forEach(([filterId, filterValue]) => {
            setFilterParams(filterId, filterValue);
          });
    };

        const isCategoryActive = (filterParams: { [key: string]: string | string[] | number[] }) => {
            const searchParams = new URLSearchParams(window.location.search);
            return Object.entries(filterParams).every(([key, value]) => 
                searchParams.get(key) === value.toString()
            );
        };
    


    return (
        <ToggleGroup.Root type="single" className=" max-sm:px-4 font-medium text-gray-900 " aria-label="Categories Filter">
            {subCategories.map((category : SubCategory) => (
                <ToggleGroup.Item
                    key={category.name}
                    value={category.name}
                    className={`TabsTrigger items-center gap-2 my-4 transition duration-200 ease-in-out flex data-[state=active]:border-2 font-semibold rounded-lg p-2 shadow-md border-[#003366] ${
                        isCategoryActive(category.filterParams) ? 'bg-[#003366] text-white ' : 'bg-gray-200'
                    }`}
                    onClick={() => applyFilters(category.filterParams)}
                >
                    {category.name}
                </ToggleGroup.Item>
            ))}
        </ToggleGroup.Root>
    );
}

export default CategoriesFilter;
