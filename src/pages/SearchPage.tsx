import React, {FC } from 'react';
import FilterSection from '../components/FilterSection';


const SearchPage: FC = () => {

  return (
    <div className="min-h-full">
      <header className="bg-transparent">
        <div className="relative sm:h-[200px] h-fit w-full bg-transparent">
          <div
        className="absolute inset-x-10 top-[-50rem] -z-30 transform-gpu overflow-hidden blur-3xl sm:top-[-11rem] top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr to-[#8ba2be] from-[#003366] opacity-30 left-[calc(80%-40rem)] w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
          <div className="absolute inset-0 opacity-60"></div>

          <div className="text-center flex flex-col h-full justify-center items-center">
            <h1 className="sm:text-3xl text-2xl font-bold  text-black mb-2">Search Properties</h1>
            <p className="text-black sm:text-lg sm:w-full max-w-2xl px-8 mx-auto sm:mx-8 text-base block">
            The Land Bank has vacant land throughout the county. Some of these parcels are in the form of undeveloped subdivisions that were started, but never completed by previous developers and others are parcels just waiting for the right owner.
            </p>
          </div>
        </div>
        
      </header>
      <main>
      
        <div className="mx-auto max-w-8xl mx-24 py-2 sm:px-6 lg:px-8">
          <div className="bg-taupe h-full">
            <FilterSection />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchPage;