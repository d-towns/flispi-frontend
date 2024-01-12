import { XMarkIcon } from '@heroicons/react/20/solid';
import * as Dialog from '@radix-ui/react-dialog';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NotLoggedInDialogProps {
    open: boolean;
    onOpenChange?: (open: boolean) => void;
}

export const NotLoggedInDialog = (
    { open, onOpenChange }: NotLoggedInDialogProps
) => {
    const navigate = useNavigate();

    return (
  <Dialog.Root open={open}>
    <Dialog.Trigger />
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black data-[state=open]:opacity-25 fixed inset-0" />
      <Dialog.Content className="data-[state=open]:opacity-100 z-100 fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <Dialog.Title className="text-mauve12 m-0 text-[17px] text-xl font-medium">
            You must be logged in to complete this action
        </Dialog.Title>
        <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            Please login or create an account to continue
        </Dialog.Description>
        <div className="mt-[25px] flex justify-center gap-5">
            <button onClick={() => navigate('/login')} className=" text-white transition duration-300 bg-gradient-to-br from-[#8ba2be] to-[#A9A9A9] hover:scale-105 transition focus:ring-gray-300 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
            Log In
            </button>
            <Dialog.Close asChild>
            <button className="transition duration-300 bg-red-400 text-white hover:bg-red-600 hover:scale-105 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                Close
            </button>
            </Dialog.Close>
        </div>
        <Dialog.Close asChild>
            <button
            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
            >
            <XMarkIcon />
            </button>
        </Dialog.Close>
        </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
    )
    };