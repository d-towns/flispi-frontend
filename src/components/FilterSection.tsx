import React, { FC, Fragment, useState, useEffect, useCallback } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon, MapIcon } from '@heroicons/react/20/solid'
import { cities, getSlidingWindow, PAGE_SIZE } from '../utils/utils';
import { Property } from '../models/Property.model';
import GridList from './GridList';
import SearchBar from './SearchBar';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Skeleton from './Skeleton';
import Dropdown from './MultiSelect';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/20/solid'
import Slider from './Slider';
import * as Tabs from '@radix-ui/react-tabs';
import PropertyMap from './PropertyMap';
import { fetchPropertySearchData, fetchZipCodes } from '../services/property.service';

const sortOptions = [
  { 
    name: 'Newest', 
    sortFilter: 'year_built,DESC',
    current: false,
  },
  { 
    name: 'Sq. Feet: Low to High', 
    sortFilter: 'square_feet,ASC',
    current: false,
  },
  { 
    name: 'Sq. Feet: High to Low', 
    sortFilter: 'square_feet,DESC',
    current: false,
  },
  { 
    name: 'Price: Low to High', 
    sortFilter: 'price,ASC',
    current: false,
  },
  { 
    name: 'Price: High to Low', 
    sortFilter: 'price,DESC',
    current: false,
  },
];

const subCategories = [
  { name: 'Featured Properties ', href: '?featured=true' },
  { name: 'Ready For Rehab', href: '?propertyClass=Res+Imp' },
  { name: 'Commercial Opportunities', href: '?propertyClass=Com+Imp%2CCom+Vac+Lot' },
]

const filterIds = [
  'city',
  'zip',
  'propertyClass',
  'price',
  'sqft',
  'lotSize',
  'sort',
  'featured'
]

const filtersFormData = [
  {
    id: 'propertyClass',
    name: 'Property Class',
    options: [
      { value: 'Res Imp', label: 'Res Imp', checked: false },
      { value: 'Res Vac Lot', label: 'Res Vac Lot', checked: false },
      { value: 'Com Imp', label: 'Com Imp', checked: true },
      { value: 'Com Vac Lot', label: 'Com Vac Lot', checked: false },
    ],
  },
  {
    id: 'city',
    name: 'City',
    options: Object.values(cities).map((city: any) => {
      return { value: city, label: city, checked: false }
    }),
  },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export type FilterOptions = {
  city?: string[];
  zip?: string[];
  propertyClass?: string[];
}

const FilterSection: FC = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [page, setPage] = useState(0); // Pagination
  const [searchTotal, setSearchTotal] = useState(0); // Pagination
  const [isLoadingPage, setIsLoadingPage] = useState(false); // Pagination
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [pageList, setPageList] = useState<number[]>([1, 2]); // Pagination
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<Property[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchZipCodeData = useCallback(async () => {
    const response = await fetchZipCodes();
    setZipCodes(response);
  }, [])


  const fetchData = useCallback(async () => {
    setIsLoadingPage(true);
    const data = await fetchPropertySearchData(searchParams, page, 30);
    setCurrentPage(data.properties);
    setSearchTotal(data.metadata.total)
    const {
      startIndex,
      endIndex,
      totalPages
    } = getSlidingWindow(page, data.metadata.total);
    // Generate the sliding window array
    setPageList(Array.from({ length: totalPages }, (_, index) => index + 1).slice(startIndex - 1, endIndex));
    setIsLoadingPage(false);
  }, [searchParams, page, setPageList])



  useEffect(() => {
    fetchData();
  }, [searchParams, fetchData, page]);

  useEffect(() => {
    fetchZipCodeData();
  }, [fetchZipCodeData])

  const setFilterParams = (filterId: string, filterValue: string | string[]| number[]) => {
    const filterString = Array.isArray(filterValue) ? filterValue.join(',') : filterValue;
    searchParams.set(filterId, filterString as string);
    setSearchParams(searchParams);
  }

  const clearFliterParams = () => {
    filterIds.forEach((filter) => {
      searchParams.delete(filter);
    })
    setSearchParams(searchParams);
    navigate(0)
  }

  const clearSort = () => {
    searchParams.delete('sort');
    sortOptions.forEach((option) => {
      option.current = false;
    });
    setSearchParams(searchParams);
  }

  useEffect(() => {
    // set the checked value to true for all filters that are in the search params by the filter id 
    filtersFormData.forEach((filter) => {
      const filterValues = searchParams.get(filter.id)?.split(',') || [];
      filter.options.forEach((option) => {
        option.checked = filterValues.includes(option.value)
      })
    })

  }, [searchParams])

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

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <div>
                    <h3 className="sr-only">Categories</h3>
                    </div>

                    <ul className="px-2 py-3 font-medium text-gray-900">
                      {subCategories.map((category) => (
                        <li key={category.name} className={``}>
                          <Link to={category.href} className={`block px-2 py-3 rounded-lg w-fit ${window.location.toString().includes(category.href) ? 'bg-[#003366] text-white' : ''}`}>
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {/* Mobile City & Property Class Filter */}
                    {filtersFormData.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      onChange={() => {
                                        option.checked = !option.checked;
                                        setFilterParams(section.id, filtersFormData.find((filter) => filter.id === section.id)?.options.filter((option) => option.checked).map((option) => option.value) || ['']);
                                      }}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                    {/* Mobile Zip Filter */}
                    <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                      
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">Zip Codes</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          <Dropdown selectedOptions={searchParams.get('zip')?.split(',')} options={zipCodes} handleChange={(zips) => setFilterParams('zip', zips)} />
                        </div>
                      </Disclosure.Panel>
                          </>
                        )}
                    </Disclosure>
                    {/* Mobile Price Filter */}
                    <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">Price</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                          <Slider initialValue={[Number(searchParams.get('price')) ?? 50000]} label='Maximum Price' defaultValue={[50000]} max={50000} step={500} unit='' formatter={new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          })} onValueCommit={
                            (price) => setFilterParams('price', price)
                          } />
                        </div>
                      </Disclosure.Panel>
                          </>
                        )}
                    </Disclosure>
                    {/* Mobile Sqft Filter */}
                    <Disclosure as="div" key={'sqft'} className="border-t border-gray-200 px-4 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-lg text-gray-900">Sq. Feet</span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon className="h-5 w-5" aria-hidden="true" />
                            ) : (
                              <PlusIcon className="h-5 w-5" aria-hidden="true" />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          <Slider initialValue={[Number(searchParams.get('sqft')) ?? 1000]} label='Minimum' unit="Sq. Ft." step={50} max={1000} defaultValue={[1000]} onValueCommit={
                            (sqft) => setFilterParams('sqft', sqft)
                          } />
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                {/* Mobile Lot Size Filter */}
                <Disclosure as="div" key={'lotsqft'} className="border-t border-gray-200 px-4 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900 text-lg">Lot Size</span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon className="h-5 w-5" aria-hidden="true" />
                            ) : (
                              <PlusIcon className="h-5 w-5" aria-hidden="true" />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          <Slider initialValue={[Number(searchParams.get('lotsize')) ?? 50]} label='Minimum' step={1} max={50} defaultValue={[50]} unit="acres" onValueCommit={
                            (lotSize) => setFilterParams('lotSize', lotSize)
                          } />
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
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
              <button type='button' onClick={clearFliterParams} className="lg:hidden m-2 rounded-lg border-2 px-2 border-black hover:border-red-600  p-1 text-xs  hover:bg-red-600 hover:text-white transition ease-in-out duration-200 h-fit">
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
                  <button type='button' onClick={clearFliterParams} className='rounded-lg border-2 border-black hover:border-red-600  p-1 mt-5  hover:bg-red-600 hover:text-white transition ease-in-out duration-200 h-fit'>
                    <span className='text-sm flex'>Clear All</span>
                  </button>
}
                </div>
                <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href} className={` p-2 rounded-lg ${window.location.toString().includes(category.href) ? 'bg-[#003366] text-white' : ''}`}>{category.name}</a>
                    </li>
                  ))}
                </ul>
                {/* Desktop Price Filter */}
                <Disclosure as="div" key={'price'} className="border-b border-gray-200 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">Price</span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon className="h-5 w-5" aria-hidden="true" />
                            ) : (
                              <PlusIcon className="h-5 w-5" aria-hidden="true" />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          <Slider initialValue={[Number(searchParams.get('price')) ?? 50000]} label='Maximum Price' defaultValue={[50000]} max={50000} step={500} unit='' formatter={new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          })} onValueCommit={
                            (price) => setFilterParams('price', price)
                          } />
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
              </Disclosure>
                {/* Desktop Sqft Filter */}
                <Disclosure as="div" key={'sqft'} className="border-b border-gray-200 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">Sq. Feet</span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon className="h-5 w-5" aria-hidden="true" />
                            ) : (
                              <PlusIcon className="h-5 w-5" aria-hidden="true" />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          <Slider initialValue={[Number(searchParams.get('sqft')) ?? 1000]} label='Minimum' unit="Sq. Ft." step={50} max={1000} defaultValue={[1000]} onValueCommit={
                            (lotSize) => setFilterParams('sqft', lotSize)
                          } />
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                {/* Desktop Lot Size Filter */}
                <Disclosure as="div" key={'lotsqft'} className="border-b border-gray-200 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">Lot Size</span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon className="h-5 w-5" aria-hidden="true" />
                            ) : (
                              <PlusIcon className="h-5 w-5" aria-hidden="true" />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          <Slider initialValue={[Number(searchParams.get('lotsize')) ?? 50]} label='Minimum' step={1} max={50} defaultValue={[50]} unit="acres" onValueCommit={
                            (lotSize) => setFilterParams('lotSize', lotSize)
                          } />
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                {/* Desktop Zip Filter */}
                <Disclosure as="div" key={'zip'} className="border-b border-gray-200 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">Zip Codes</span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon className="h-5 w-5" aria-hidden="true" />
                            ) : (
                              <PlusIcon className="h-5 w-5" aria-hidden="true" />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          <Dropdown selectedOptions={searchParams.get('zip')?.split(',')} options={zipCodes} handleChange={
                            (zips) => setFilterParams('zip', zips)
                          } />
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                {/* Desktop City & Property Class Filter */}
                {filtersFormData.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onChange={() => {
                                    option.checked = !option.checked;
                                    setFilterParams(section.id, filtersFormData.find((filter) => filter.id === section.id)?.options.filter((option) => option.checked).map((option) => option.value) || ['']);
                                  }}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <Tabs.Root className="TabsRoot lg:col-span-3" defaultValue="tab1">
                <Tabs.List className="TabsList w-full justify-center flex flex-row" aria-label="Manage your account">
                  <Tabs.Trigger className="TabsTrigger items-center gap-2 flex data-[state=active]:border-2 font-bold rounded-lg p-2 bg-gray-100 shadow-md border-[#003366] mx-5" value="tab1">
                    <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                    List View
                  </Tabs.Trigger>
                  <Tabs.Trigger className="TabsTrigger items-center flex gap-2 data-[state=active]:border-2 font-bold border-[#003366]  rounded-lg p-2 bg-gray-100 shadow-md mx-5" value="tab2">
                    <MapIcon className="h-5 w-5" aria-hidden="true" />
                    Map View
                  </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content className="TabsContent" value="tab1">
                  <div >
                    <div className="flex items-center justify-between bg-transparent px-4 py-3 sm:px-6">
                      <div className="flex flex-1 justify-between sm:hidden">
                        <button
                          onClick={() => setPage(page - 1)}
                          disabled={searchTotal < PAGE_SIZE || ( page === Math.ceil(searchTotal / PAGE_SIZE) - 1 || page === 0)}
                          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Previous
                        </button>

                        <button
                        onClick={() => setPage(page + 1)}
                        disabled={searchTotal < PAGE_SIZE || page === Math.ceil(searchTotal / PAGE_SIZE) - 1}
                          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Next
                        </button>
                      </div>
                      <div className="hidden pt-4 sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm text-gray-700">
                          Showing <span className="font-medium">{page * PAGE_SIZE}</span> to <span className="font-medium">{(page + 1) * PAGE_SIZE > searchTotal ? searchTotal : (page + 1) * PAGE_SIZE}</span> of{' '}
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
                              onClick={() => setPage(0)}
                              disabled={page === 0}
                            >
                              <span className="sr-only">Previous</span>
                              <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                              className="relative inline-flex bg-white items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                              onClick={() => setPage(page - 1)}
                              disabled={page === 0}
                            >
                              <span className="sr-only">Previous</span>
                              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                            {pageList.map((number) => {
                              return (
                                <button
                                  key={"pgn-" + number}
                                  onClick={() => setPage(number - 1)}
                                  disabled={searchTotal < PAGE_SIZE}
                                  className="relative inline-flex items-center px-4 py-2 text-sm hover:bg-gray-200 font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                                  style={
                                    page === number -1 ? { backgroundColor: '#003366', color: 'white' } : {}
                                  }
                                >
                                  {number}
                                </button>
                              )
                            })}
                            <button
                              onClick={() => setPage(page + 1)}
                              disabled={searchTotal < PAGE_SIZE || page === Math.ceil(searchTotal / PAGE_SIZE) - 1}
                              className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                              <span className="sr-only">Next</span>
                              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                              onClick={() => setPage(Math.ceil(searchTotal / PAGE_SIZE) - 1)}
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
                    {!isLoadingPage ? <GridList currentPage={currentPage}/> : <Skeleton />}
                    {/* Pagination */}
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing <span className="font-medium">{page === 0 ? 0 : page * PAGE_SIZE}</span> to <span className="font-medium">{(page + 1) * PAGE_SIZE > searchTotal ? searchTotal: (page + 1) * PAGE_SIZE}</span> of{' '}
                          <span className="font-medium">{searchTotal}</span> results
                        </p>
                      </div>
                      <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                          <button
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 0}
                          >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                          </button>

                          {pageList.map((number) => {
                            return (
                              <button
                                key={"pgn-" + number}
                                onClick={() => setPage(number)}
                                disabled={searchTotal < PAGE_SIZE}
                                className="relative inline-flex items-center px-4 py-2 text-sm hover:bg-gray-200 font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                                style={
                                  page === number - 1 ? { backgroundColor: '#003366', color: 'white' } : {}
                                }
                              >
                                {number}
                              </button>
                            )
                          })}
                          <button
                            onClick={() => setPage(page + 1)}
                            disabled={searchTotal < PAGE_SIZE}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                          >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>

                </Tabs.Content>
                {/* Map View */}
                <Tabs.Content className="TabsContent" value="tab2">
                  {!isLoadingPage ? <PropertyMap properties={currentPage} /> : <Skeleton />}
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
