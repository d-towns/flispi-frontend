import React, { useState, useEffect } from 'react';
import AddToCalendar from './AddToCalendarBtn';
import { formatIsoStringToCalendar } from '../utils/utils';
import addHours from 'date-fns/addHours';

interface CountdownTimerProps {
    targetDate: Date;
    eventTitle?: string;
}


const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, eventTitle}) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 100);

        return () => clearInterval(timer);
    }, [targetDate]);

    function calculateTimeLeft(targetDate: Date) {
        const difference = +targetDate - +new Date();
        let timeLeft = {
            weeks: 0,
            days: 0,
            hours: 0,
            isPast: difference < 0,
            isClose: difference >= 0 && difference <= 3 * 24 * 60 * 60 * 1000 // within 3 days
        };

        if (difference > 0) {
            timeLeft = {
                ...timeLeft,
                weeks: Math.floor(difference / (1000 * 60 * 60 * 24 * 7)),
                days: Math.floor((difference / (1000 * 60 * 60 * 24)) % 7),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24)
            };
        }

        return timeLeft;
    }

    function getColorClass() {
        if (timeLeft.isPast) return 'text-red-700';
        if (timeLeft.isClose) return 'text-yellow-700';
        return 'text-black';
    }

    return (
        <div className={`font-sans ${getColorClass()}`}>
            {timeLeft.isPast ?
                <div>
                    <h4 className='lg:text-4xl text-2xl pb-5 font-bold' > This property's showtime has passed</h4>
                    <p className='lg:text-2xl text-xl'>
                        Please reach out to The Land Bank <a className='underline cursor-pointer' href='https://www.thelandbank.org/contact.asp'>via this form</a> or <a className='underline cursor-pointer' href='tel:8102573088'>phone</a> to schedule a showing.
                    </p>
                </div>
                :
                <>
                    <h4 className='text-2xl font-bold pb-5' >Showing Starts In</h4>
                    <p className='text-xl'>
                        {timeLeft.weeks} weeks, {timeLeft.days} days, {timeLeft.hours} hours
                    </p>
                    <div className='pt-8'>
                    <AddToCalendar
                        event={{
                            title: eventTitle || 'Property Showing',
                            description: 'Showing for property at ' + targetDate.toDateString(),
                            location: 'Land Bank Office',
                            startTime: formatIsoStringToCalendar( targetDate.toISOString()),
                            endTime: formatIsoStringToCalendar(addHours(targetDate, 1).toISOString())
                        }}
                    />
                    </div>
                </>
            }

        </div>
    );
};

export default CountdownTimer;
