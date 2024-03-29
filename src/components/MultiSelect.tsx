import React, { useEffect, Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'


interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  options: string[];
  selectedOptions?: string[];
  optionsLabel?: string;
  handleChange: (cities: string[]) => void;
}

export type FilterOptions = {
city?: string[];
zip?: string[];
}
 const Dropdown = ({options, optionsLabel, handleChange, selectedOptions}: DropdownProps ) => {
  /**
   * 1. Get the selected options from the search params
   * 2. Set the selected options to the state
   * 3. When the state changes, call the handleChange function
   */

  const [selected, setSelected] = useState(selectedOptions ?? [''])
  const [query, setQuery] = useState('')


  const handleFilterChange = (selectedValues: string[]) => {
    setSelected(selectedValues)
    handleChange(selected)
  }

  useEffect(() => {
    handleChange(selected)
  }, [selected, handleChange])

  const dropdownProps =
    query === ''
      ? options
      : options.filter((option) =>
        option?.toLowerCase()
            .replace(/\s+/g, '')
            .includes(query?.split(',')[0].toLowerCase().replace(/\s+/g, ''))
        )

  return (
    <div className='flex flex-col'>
    <p className='ml-1'>{optionsLabel}</p>
      <Combobox multiple value={selected} onChange={handleFilterChange}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-[#003366] sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 bg-gray-100 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              placeholder="48505, 48423, ..."
              displayValue={(selectedValues : string[] ) => {
                return selectedValues?.map((selectedValue: any) => selectedValue).join(', ')
              }}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {dropdownProps.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                dropdownProps.map((option) => (
                  <Combobox.Option
                    key={option}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-[#003366] text-white' : 'text-gray-900'
                      }`
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {option}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-[#003366]'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      </div>
  )
}

export default Dropdown
