import * as PopoverPrimitive from '@radix-ui/react-popover';
import { InformationCircleIcon } from '@heroicons/react/20/solid';
import React from 'react';

interface InfoPopoverProps {
  title: string;
  content: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

const InfoPopover: React.FC<InfoPopoverProps> = ({ title, content, side }) => {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>
      <InformationCircleIcon className="w-5 h-5 inline" />
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content side={side} className="p-4 max-w-sm bg-white rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-700">
            {content}
          </p>
          <PopoverPrimitive.Arrow className="fill-current text-white"/>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};

export default InfoPopover;
