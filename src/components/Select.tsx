import React from "react";
import * as Select from '@radix-ui/react-select'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

interface SelectDropdownProps {
    options: string[];
    placeholder?: string
    onValueChange: (value:string) => void;
    value : string | undefined
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

const SelectDropdown = ({options, onValueChange, value, placeholder}: SelectDropdownProps) => {
    return (
    <Select.Root  value={value} onValueChange={(value:string) => onValueChange(value)}>
      <Select.Trigger
        className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-gray-200 text-violet11 shadow-[0_2px_10px] shadow-black/10  focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
        aria-label="Food"
      >
        <Select.Value placeholder={placeholder ?? 'Select an option...'} />
        <Select.Icon className="text-violet11">
          <ChevronDownIcon className="w-5 h-5"/>
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal >
        <Select.Content className="z-10 bg-gray-200 rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-gray-200 text-violet11 cursor-default">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="z-20">
            {options.map((option) => {
                return (
                    <SelectItem value={option} >
                        {option}
                    </SelectItem>
                )
            })}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-gray-200 text-violet11 cursor-default">
            <ChevronDownIcon className="w-5 h-5" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
    )
};

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    value: string;
    // Include other props specific to this component if necessary
  }
  
  const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(({ children, className, value }: SelectItemProps, forwardedRef) => {
    return (
      <Select.Item
        className={classNames(
          'text-[13px] leading-none text-violet11 rounded-[3px] flex items-center hover:bg-[#003366] hover:text-white transition ease-in-out duration-100 h-[25px] pr-[35px] pl-[25px] select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1',
          className ?? ''
        )}
        value={value}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <CheckIcon className="w-5 h-5"/>
        </Select.ItemIndicator>
      </Select.Item>
    );
  });

export default SelectDropdown