import React, { ReactNode } from 'react';
import { Disclosure } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';

interface FilterComponentProps {
  title: string;
  panelComponent: ReactNode;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ title, panelComponent }) => {
  return (
    <Disclosure as="div" className="border-t border-b border-gray-200 px-4 py-6 sm:border-t-0 sm:border-b sm:px-0">
      {({ open }) => (
        <>
          <h3 className="-mx-2 -my-3 flow-root sm:-mx-0 sm:-my-3">
            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500 sm:px-0 sm:py-3 sm:text-sm">
              <span className="font-medium text-gray-900">{title}</span>
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
              {panelComponent}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default FilterComponent;
