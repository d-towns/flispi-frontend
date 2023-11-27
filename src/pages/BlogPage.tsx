import React, { useEffect } from 'react'
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'

const BlogPage = () => {
       return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-16 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-x-10 top-[-50rem] -z-30 transform-gpu overflow-hidden blur-3xl sm:top-[60rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr to-[#8ba2be] from-[#003366] opacity-30 sm:left-[calc(0%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-[#8ba2be]">What We Do</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">You can purchase a home from the Land Bank </h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                Interested parties can simply show up to scheduled open houses, view the home, and if interested, obtain a offer form from the Land Bank employee showing the house.
              </p>
            </div>
          </div>
        </div>
        <div className="lg:-ml-12 lg:-mt-12 lg:p-12 w-fit items-center lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            className="w-full object-cover mx-auto max-w-none rounded-xl bg-gray-90adow-x0 shl ring-1 ring-gray-400/10 lg:w-[57rem]"
            src="/lb_4.jpeg"
            alt=""
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <p className='pb-5'>
                To find out which properties are available for sale, check out the Featured Homes and Ready for Rehab sections on our website, follow us on Facebook, submit your e-mail address to receive our weekly open house e-mails, or pick up free flyers in the 1st floor lobby of the Land Bank Center.
              </p>
              <p>
                We will have new homes available each week.

                 Closing must occur within 21 days of offer being accepted.

                 
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <CloudArrowUpIcon className="mt-1 h-5 w-5 flex-none text-[#8ba2be]" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-gray-900">Making An Offer.</strong> Highest and best offers are due the week after the open house and the winning offer is notified within a few weeks of the offer deadline.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <LockClosedIcon className="mt-1 h-5 w-5 flex-none text-[#8ba2be]" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-gray-900">Rennovation.</strong> The Land Bank also renovates several homes a year and lists these homes with realtors.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <ServerIcon className="mt-1 h-5 w-5 flex-none text-[#8ba2be]" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-gray-900">Lending and Brokers.</strong> These homes are ready to move in and qualify for a mortgage with most lenders. Look for these homes with your preferred realtor through a Multiple Listing Service (MLS).
                  </span>
                </li>
              </ul>
              <p className="mt-8">
              To be eligible applicants must intend to live in the home (primary residence) after renovations are complete. 
All land contract buyers are required to attend homebuyer education before closing on home, 
<p>through a housing counselor approved by the Michigan State Housing Development Authority or the U.S. Department of Housing and Urban Development prior to purchase. </p>  <p className='my-8'>Contact Metro Community Development Example County Habitat for Humanity to register for their Fair Housing & Introduction to Homebuyer Education Workshop now and be ready when the Land Bank contacts you to see the home you have applied for. </p> This workshop is now $25.  Metro Community Development is offering $500 for down payment assistance to eligible land contract holders. Click on this link for more details. 
</p>
<p className='my-8'>
An applicant must provide proof of income with their offer. The estimated housing expenses should not exceed 30% of the applicant’s take home income to qualify for the land contract. (Housing expenses are defined as: land contract payment, estimated property taxes, estimated water expenses, and estimated utilities.) 

A land contract term will vary based on the amount but will not exceed 5 years.
The interest rate on the land contract will be 7%.
The minimum down payment on a land contract is 10% or $1,000 whichever is more. Proof of available funds for down payment is required to be submitted with offer. 
The purchaser is responsible for paying all property taxes and any assessments starting the day the land contract is executed.
</p>
Applicants must meet all criteria listed in the Residential Land Transfer Policies to be considered for a land contract. Land Bank Policies.
              
              
              <p className="mt-6">
                <button className='hover:scale-05 transition ease-in-out duration-200'>

              <Link to='/contact' className="mt-16 text-2xl font-bold tracking-tight text-gray-900 cursor-pointer ">Questions? Click here to contact us!</Link>

                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPage