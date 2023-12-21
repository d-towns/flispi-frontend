import React from 'react';

const staff = [
    {
        id: 1,
        name: 'Dennis Towns',
        position: 'Software Engineer',
        photo: 'dennis_beach.JPG'
    },
]

const StaffPage = () => {
    return (
        <>
              <div
        className="absolute inset-x-10 top-[-50rem] -z-30 transform-gpu overflow-hidden blur-3xl sm:top-[3rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr to-[#8ba2be] from-[#003366] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="bg-gray-100 max-w-none">
        <div className="bg-gray-100 max-w-6xl mx-auto py-16 sm:py-24 text-sm">
        <div className="mx-auto max-w-4xl text-center mb-32">
            <h2 className="sm:text-base text-base font-semibold leading-7 text-[#8ba2be]"> Flint Property Search</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Our Mission </p>
            <p className="mt-6 mx-auto max-w-2xl lg:max-w-none sm:text-lg text-lg leading-8 text-gray-600">
                This tool was built to help you find information about properties in the City of Flint, but our mission is much bigger than that. Our core values are to:
            </p>
          </div>
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 mx-auto lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#8ba2be]">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                  </div>
                  Promote Affordable Homeownership
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">Homes offered through the Featured Homes and Ready for Rehab programs are offered at affordable prices. Open houses are also posted for seamless purchasing. Land Contracts are tailored for those seeking to make the house their primary residence, with financial suitability in mind</dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#8ba2be]">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  Create Economic Opportunities
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Our Property database is updated weekly with new properties and open house information. We also provide information on local contractors and resources to help you make your house a home.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#8ba2be]">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                  </div>
                  Activate Vacant Land
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">We help you to acquire adjacent vacant land to expand your living space or for community projects. The Genesee County Land Bank Side Lot Program and market-value sales are geared towards encouraging neighborhood beautification and the productive use of vacant properties.</dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#8ba2be]">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
                    </svg>
                  </div>
                  Streamline Property Information
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  We gather data from local government and community partners to provide you with the most up-to-date information on properties in your neighborhood. Our website is updated weekly with new properties and open house information.
                </dd>
              </div>
            </dl>
            </div>
            </div>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-24">
            <div className="text-center pb-12">
                <h2 className="text-base font-bold text-[#8ba2be]">
                Flint Property Search
                </h2>
                <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900">
                    Check our awesome team members
                </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 gap-6">
                {staff.map((member) => (
                    <div className="w-full hover:scale-110 transition ease-in-out duration-200 cursor-pointer bg-transparent rounded-lg p-12 flex flex-col justify-center items-center">
                        <div className="mb-8">
                            <img className="object-center object-cover rounded-full h-48 w-48" src={member.photo} alt="photo" />
                        </div>
                        <div className="text-center">
                            <p className="text-xl text-gray-700 font-bold mb-2">{member.name}</p>
                            <p className="text-base text-gray-400 font-normal">{member.position}</p>
                        </div>
                    </div>
                ))
                }
            </div>
        </section>
        </>
    )
        
}

export default StaffPage;