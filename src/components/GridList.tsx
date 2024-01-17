import React, { FC } from "react";
import GridItem from "./GridItem";
import { Property } from "../models/Property.model";


interface GridListProps {
  currentPage: Array<Property>;
}

const GridList: FC<GridListProps> = ({ currentPage }) => {
  return (
    <>
    {
      currentPage.length > 0 ?
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 p-4">

        {currentPage?.map((item) => (
          <GridItem key={item.id} property={item} /> 
        ))}
      </div> :
      <div className="flex justify-self-center items-center justify-center bg-transparent px-2 h-full">
        <div className="w-full max-w-md  mx-auto border border-black bg-white rounded-3xl shadow-xl my-[15%] overflow-hidden">
          <div className="max-w-md mx-auto">
            <div className="p-4 sm:p-6 pt-6 text-center">
              <p className="font-bold text-gray-700 text-[22px] leading-7 mb-1">
                No properties found
              </p>
              <div className="">
              </div>
            </div>
          </div>
        </div>
      </div>
}

    </>
  );
};

export default GridList;