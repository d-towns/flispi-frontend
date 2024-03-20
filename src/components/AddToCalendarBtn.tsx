import React from 'react';

interface AddToCalendarProps {
  event: {
    title: string;
    description: string;
    location: string;
    startTime: string; // Format: YYYYMMDDTHHmmssZ
    endTime: string; 
  };
}

const AddToCalendar: React.FC<AddToCalendarProps> = ({ event }) => {
  const { title, description, location, startTime, endTime } = event;

  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
  const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&startdt=${startTime}&enddt=${endTime}&body=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;

//   const icsFileUrl = 'path_to_your_ics_file.ics';

  return (
    <div className="flex flex-col space-y-2 items-center">
      {/* <a
        href={icsFileUrl}
        download={`${title}.ics`}
        className="w-1/2 border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-4 py-2 rounded outline-none transition-colors duration-300"
      >
        Add to Apple Calendar
      </a> */}
    
      <a
        href={googleUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="border border-gray-300 flex-none rounded-lg transition duration-300 bg-gray-200 hover:bg-gray-300  px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <img src="/google.png" className='inline mr-5' alt="Add to Google Calendar" />
        Add to Google Calendar
      </a>
      <a
        href={outlookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="border border-gray-300 flex-none rounded-lg transition duration-300 bg-gray-200 hover:bg-gray-300  px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <img src="/microsoft.png" className='inline mr-5' alt="Add to Outlook Calendar" />
        Add to Outlook Calendar
      </a>
    </div>
  );
};

export default AddToCalendar;
