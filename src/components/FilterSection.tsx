import React, { FC, Fragment } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, Squares2X2Icon, MapIcon } from '@heroicons/react/20/solid'
import GridList from './GridList';
import SearchBar from './SearchBar';
import { Link, useSearchParams } from 'react-router-dom';
import Skeleton from './Skeleton';
import Dropdown from './MultiSelect';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/20/solid'
import Slider from './Slider';
import * as Tabs from '@radix-ui/react-tabs';
import PropertyMap from './PropertyMap';
import SelectDropdown from './Select';
import { subCategories, sortOptions, filtersFormData, PAGE_SIZE } from '../utils/utils';
import usePropertySearch from '../hooks/usePropertySearch';
import FilterComponent from './FilterBar';
import CategoriesFilter from './CategoriesFilter';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export type FilterOptions = {
  city?: string[];
  zip?: string[];
  propertyClass?: string[];
}

const FilterSection: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    mobileFiltersOpen,
    setMobileFiltersOpen,
    pageNumber,
    setPageNumber,
    searchTotal,
    isLoadingPage,
    pageList,
    setCurrentTab,
    zipCodes,
    currentPage,
    setFilterParams,
    clearFilterParams,
    clearSort
  } = usePropertySearch();


  return (
    <div className="bg-transparent w-full">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            {/* Mobile sidebar */}
            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                {/* Mobile sidebar header */}
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <div className=" ">
                      <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    </div>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Mobile Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <div>
                      <h3 className="sr-only">Categories</h3>
                    </div>
                    <CategoriesFilter />
                    {/* Mobile City  */}
                    <FilterComponent
                      title="City"
                      panelComponent={
                        <Dropdown selectedOptions={searchParams.get('city')?.split(',')} options={filtersFormData.find((filter) => filter.id === 'city')?.options.map((option) => option.value) || []} handleChange={
                          (cities) => setFilterParams('city', cities)
                        } />
                      }
                    />
                    {/* Mobile Property Class Filter */}
                    <FilterComponent
                      title="Property Class"
                      panelComponent={
                        <div className="space-y-4">
                          {filtersFormData.find((filter) => filter.id === 'propertyClass')?.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                id={`filter-${optionIdx}`}
                                name={`propertyClass[]`}
                                defaultValue={option.value}
                                type="checkbox"
                                defaultChecked={option.checked}
                                onChange={() => {
                                  option.checked = !option.checked;
                                  setFilterParams('propertyClass', filtersFormData.find((filter) => filter.id === 'propertyClass')?.options.filter((option) => option.checked).map((option) => option.value) || ['']);
                                }}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      }
                    />
                    {/* Mobile Zip Filter */}
                    <FilterComponent
                      title="Zip Codes"
                      panelComponent={
                        <Dropdown selectedOptions={searchParams.get('zip')?.split(',')} options={zipCodes} handleChange={
                          (zips) => setFilterParams('zip', zips)
                        } />
                      }
                    />
                    {/* Mobile Price Filter */}
                    <FilterComponent
                      title="Price"
                      panelComponent={
                        <Slider initialValue={[Number(searchParams.get('price')) ?? 50000]} label='Maximum Price' defaultValue={[50000]} max={50000} step={500} unit='' formatter={new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })} onValueCommit={
                          (price) => setFilterParams('price', price)
                        } />
                      }
                    />
                    {/* Mobile Sqft Filter */}
                    <FilterComponent
                      title="Sq. Feet"
                      panelComponent={
                        <Slider initialValue={[Number(searchParams.get('sqft')) ?? 1000]} label='Minimum' unit="Sq. Ft." step={50} max={1000} defaultValue={[1000]} onValueCommit={
                          (sqft) => setFilterParams('sqft', sqft)
                        } />
                      }
                    />
                    {/* Mobile Lot Size Filter */}
                    <FilterComponent
                      title="Lot Size"
                      panelComponent={
                        <Slider initialValue={[Number(searchParams.get('lotsize')) ?? 50]} label='Minimum' step={1} max={50} defaultValue={[50]} unit="acres" onValueCommit={
                          (lotSize) => setFilterParams('lotSize', lotSize)
                        } />
                      }
                    />
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-none w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 sm:pt-16 pt-4">
            <SearchBar searchParams={searchParams} setSearchParams={setSearchParams} />

            <div className="flex items-center">

              <button
                type="button"
                className="-m-2 ml-4 mr-2 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              {searchParams.toString() !== '' &&
                <button type='button' onClick={clearFilterParams} className="lg:hidden m-2 rounded-lg border-2 px-2 border-black hover:border-red-600  p-1 text-xs  hover:bg-red-600 hover:text-white transition ease-in-out duration-200 h-fit">
                  Clear
                </button>
              }
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-4">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Desktop Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <div className='flex gap-4 justify-between'>
                  <h2 className="text-xl mb-5 pl-2 font-bold">Categories</h2>
                  {searchParams.toString() !== '' &&
                    <button type='button' onClick={clearFilterParams} className='rounded-lg border-2 border-black hover:border-red-600  p-1  hover:bg-red-600 hover:text-white transition ease-in-out duration-200 h-fit'>
                      <span className='text-sm flex'>Clear All</span>
                    </button>
                  }
                </div>
<CategoriesFilter/>
                {/* Desktop Price Filter */}
                <FilterComponent
                  title="Price"
                  panelComponent={
                    <Slider initialValue={[Number(searchParams.get('price')) ?? 50000]} label='Maximum Price' defaultValue={[50000]} max={50000} step={500} unit='' formatter={new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })} onValueCommit={
                      (price) => setFilterParams('price', price)
                    } />
                  }
                />
                {/* Desktop Bedrooms Filter */}
                <FilterComponent
                  title="Bedrooms"
                  panelComponent={
                    <SelectDropdown
                      options={Array.from({ length: 5 }, (_, index) => `${index}`)}
                      placeholder='Minimum Bedrooms...' value={searchParams.get('bedrooms') ?? undefined}
                      onValueChange={(value: string) => {
                        searchParams.set('bedrooms', value);
                        setSearchParams(searchParams)
                      }}
                    />
                  }
                />
                {/* Desktop Bathrooms Filter */}
                <FilterComponent
                  title="bathrooms"
                  panelComponent={
                    <SelectDropdown
                      options={Array.from({ length: 5 }, (_, index) => `${index}`)}
                      placeholder='Minimum Bathrooms...' value={searchParams.get('bathrooms') ?? undefined}
                      onValueChange={(value: string) => {
                        searchParams.set('bathrooms', value);
                        setSearchParams(searchParams)
                      }}
                    />
                  }
                />
                <FilterComponent
                  title="Property Class"
                  panelComponent={
                    <div className="space-y-4">
                      {filtersFormData.find((filter) => filter.id === 'propertyClass')?.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            id={`filter-${optionIdx}`}
                            name={`propertyClass[]`}
                            defaultValue={option.value}
                            type="checkbox"
                            defaultChecked={option.checked}
                            onChange={() => {
                              option.checked = !option.checked;
                              setFilterParams('propertyClass', filtersFormData.find((filter) => filter.id === 'propertyClass')?.options.filter((option) => option.checked).map((option) => option.value) || ['']);
                            }}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-${optionIdx}`}
                            className="ml-3 text-sm text-gray-600"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  }
                />

                {/* Desktop Sqft Filter */}
                <FilterComponent
                  title="Sq. Feet"
                  panelComponent={
                    <Slider initialValue={[Number(searchParams.get('sqft')) ?? 1000]} label='Minimum' unit="Sq. Ft." step={50} max={1000} defaultValue={[1000]} onValueCommit={
                      (lotSize) => setFilterParams('sqft', lotSize)
                    } />
                  }
                />
                {/* Desktop Lot Size Filter */}
                <FilterComponent
                  title="Lot Size"
                  panelComponent={
                    <Slider initialValue={[Number(searchParams.get('lotsize')) ?? 50]} label='Minimum' step={1} max={50} defaultValue={[50]} unit="acres" onValueCommit={
                      (lotSize) => setFilterParams('lotSize', lotSize)
                    } />
                  }
                />
                {/* Desktop Zip Filter */}
                <FilterComponent
                  title="Zip Codes"
                  panelComponent={
                    <Dropdown selectedOptions={searchParams.get('zip')?.split(',')} options={zipCodes} handleChange={
                      (zips) => setFilterParams('zip', zips)
                    } />
                  }
                />
                {/* Desktop City Filter */}
                <FilterComponent
                  title="City"
                  panelComponent={
                    <Dropdown selectedOptions={searchParams.get('city')?.split(',')} options={filtersFormData.find((filter) => filter.id === 'city')?.options.map((option) => option.value) || []} handleChange={
                      (cities) => setFilterParams('city', cities)
                    } />
                  }
                />
              </form>

              {/* Product grid */}
              <Tabs.Root className="TabsRoot lg:col-span-3" defaultValue="list-tab" onValueChange={(value) => setCurrentTab(value)}>
                <Tabs.List className="TabsList w-full justify-center flex flex-row" aria-label="Manage your account">
                  <Tabs.Trigger className="TabsTrigger items-center gap-2 flex data-[state=active]:border-2 font-bold rounded-lg p-2 bg-gray-100 shadow-md border-[#003366] mx-5" value="list-tab">
                    <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                    List View
                  </Tabs.Trigger>
                  <Tabs.Trigger className="TabsTrigger items-center flex gap-2 data-[state=active]:border-2 font-bold border-[#003366]  rounded-lg p-2 bg-gray-100 shadow-md mx-5" value="map-tab">
                    <MapIcon className="h-5 w-5" aria-hidden="true" />
                    Map View
                  </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content className="TabsContent" value="list-tab">
                  <div >

                    <div className="flex items-center justify-between bg-transparent px-4 py-3 sm:px-6">

                      <div className="flex flex-1 justify-between sm:hidden">
                        <button
                          onClick={() => setPageNumber(pageNumber - 1)}
                          disabled={searchTotal < PAGE_SIZE || (pageNumber === Math.ceil(searchTotal / PAGE_SIZE) || pageNumber === 0)}
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
                          onClick={() => setPageNumber(pageNumber + 1)}
                          disabled={searchTotal < PAGE_SIZE || pageNumber === Math.ceil(searchTotal / PAGE_SIZE) - 1}
                          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Next
                        </button>
                      </div>
                      <div className="hidden pt-4 sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div className='pt-4'>
                          <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{pageNumber * PAGE_SIZE}</span> to <span className="font-medium">{(pageNumber + 1) * PAGE_SIZE > searchTotal ? searchTotal : (pageNumber + 1) * PAGE_SIZE}</span> of{' '}
                            <span className="font-medium">{searchTotal}</span> results
                          </p>
                        </div>
                        {/* Desktop Sort */}
                        <div className='flex flex-row items-center'>
                          <Menu as="div" className="relative inline-block text-left">
                            <div >
                              <Menu.Button className="relative inline-flex bg-white items-center rounded-md px-2 py-[6px] ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 mr-4">
                                Sort
                                <ChevronDownIcon
                                  className="mr-1 ml-1 w-5 flex-shrink-0  group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              </Menu.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                  {sortOptions.map((option) => (
                                    <Menu.Item key={option.name} >
                                      {({ active }) => (
                                        <button
                                          onClick={() => {
                                            clearSort();
                                            setFilterParams('sort', option.sortFilter);
                                            option.current = true;
                                          }}
                                          type='button'
                                          className={classNames(
                                            option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                            active ? 'bg-gray-100' : '',
                                            'block px-4 py-2 text-sm'
                                          )}
                                        >
                                          {option.name}
                                        </button>
                                      )}
                                    </Menu.Item>
                                  ))}
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <button
                              className="relative inline-flex bg-white items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                              onClick={() => setPageNumber(0)}
                              disabled={pageNumber === 0}
                            >
                              <span className="sr-only">Previous</span>
                              <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                              className="relative inline-flex bg-white items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                              onClick={() => setPageNumber(pageNumber - 1)}
                              disabled={pageNumber === 0}
                            >
                              <span className="sr-only">Previous</span>
                              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                            {pageList.map((number) => {
                              return (
                                <button
                                  key={"pgn-" + number}
                                  onClick={() => setPageNumber(number - 1)}
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
                              onClick={() => setPageNumber(pageNumber + 1)}
                              disabled={searchTotal < PAGE_SIZE || pageNumber === Math.ceil(searchTotal / PAGE_SIZE) - 1}
                              className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                              <span className="sr-only">Next</span>
                              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                              onClick={() => setPageNumber(Math.ceil(searchTotal / PAGE_SIZE) - 1)}
                              disabled={searchTotal < PAGE_SIZE}
                              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                              <span className="sr-only">Next</span>
                              <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                          </nav>
                        </div>
                      </div>
                    </div>
                    {!isLoadingPage ? <GridList currentPage={currentPage} /> : <Skeleton />}
                    {/* Pagination */}
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing <span className="font-medium">{pageNumber === 0 ? 0 : pageNumber * PAGE_SIZE}</span> to <span className="font-medium">{(pageNumber + 1) * PAGE_SIZE > searchTotal ? searchTotal : (pageNumber + 1) * PAGE_SIZE}</span> of{' '}
                          <span className="font-medium">{searchTotal}</span> results
                        </p>
                      </div>
                      <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            onClick={() => setPageNumber(pageNumber + 1)}
                            disabled={searchTotal < PAGE_SIZE}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                          >
                            <span className="sr-only">Next</span>
                            <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                          <button
                            className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            onClick={() => setPageNumber(pageNumber - 1)}
                            disabled={pageNumber === 0}
                          >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                          </button>

                          {pageList.map((number) => {
                            return (
                              <button
                                key={"pgn-" + number}
                                onClick={() => setPageNumber(number - 1)}
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
                            onClick={() => setPageNumber(pageNumber + 1)}
                            disabled={searchTotal < PAGE_SIZE}
                            className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                          >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                          <button
                            onClick={() => setPageNumber(Math.ceil(searchTotal / PAGE_SIZE) - 1)}
                            disabled={searchTotal < PAGE_SIZE}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                          >
                            <span className="sr-only">Next</span>
                            <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>

                </Tabs.Content>
                {/* Map View */}
                <Tabs.Content className="TabsContent" value="map-tab">
                  {!isLoadingPage ?
                    <div className=''>
                      <PropertyMap properties={currentPage}
                        pageNumber={pageNumber}
                        setPage={setPageNumber}
                        pageList={pageList}
                        searchTotal={searchTotal}
                      />
                    </div>
                    : <Skeleton />}
                </Tabs.Content>
              </Tabs.Root>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default FilterSection
