import React, { useState, ChangeEvent, FC } from 'react';
import _ from 'lodash';

// Define types for the SearchBar props
interface SearchBarProps {
  searchParams: URLSearchParams;
  setSearchParams: (value: any) => void;

}

// SearchBar Component
const SearchBar: FC<SearchBarProps> = ({ searchParams, setSearchParams }) => {
  const [searchTerm, setSearchTerm] = useState(searchParams.get("searchTerm") || "");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    debouncedHandleChange(event);
  };

  const debouncedHandleChange = _.debounce((event: ChangeEvent<HTMLInputElement>) => {
    event.target.value === "" ?
      searchParams.delete("searchTerm"):
    searchParams.set("searchTerm", event.target.value);
    setSearchParams(searchParams);
  }, 400);

  return (
    <>
      <div className="pt-2 relative mx-auto text-gray-600 w-full px-2 flex flex-row items-center">
        <input className="relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm h-10 px-5 bg-gray-200 focus:bg-gray-100"
          type="search" name="search" placeholder="Search Address or Parcel ID #"
          value={searchTerm}
          onChange={(e) => handleChange(e)} />
      </div>
    </>
  )
}

export default SearchBar