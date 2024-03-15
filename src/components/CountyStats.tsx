import React from "react";


const CountyStats = () => {
    return (
        <dl className="grid xl:grid-cols-1 md:grid-cols-3  grid-cols-1 gap-x-8 gap-y-16 text-center my-auto xl:border-r xl:border-solid xl:border-gray-300">
        <div className="relative mx-auto flex max-w-xs flex-col gap-y-4" data-aos="zoom-in-right" data-aos-duration="1000">
          <div className="absolute right-2 bottom-2 h-3/4 w-full rounded-lg bg-[#8ba2be] z-0"></div>
          <dl className="relative border border-black order-first z-10 mb-4 rounded-lg bg-white p-6 text-3xl font-semibold tracking-tight text-gray-900 shadow-md lg:text-7xl sm:text-3xl">
            <dd className="relative z-10 text-base leading-7 text-gray-600 text-xl">Funds Secured for Demolition</dd>
            $43.7 M
          </dl>
        </div>
        <div className="relative mx-auto flex max-w-sm flex-col gap-y-4" data-aos="zoom-in-up" data-aos-duration="1000">
          <div className="absolute right-2 bottom-2 h-3/4 w-full rounded-lg bg-[#8ba2be] z-0"></div>
          <dl className="relative border border-black order-first z-10 mb-4 rounded-lg bg-white p-6 text-3xl font-semibold tracking-tight text-gray-900 shadow-md lg:text-7xl sm:text-3xl">
            <dd className="relative z-10 text-base leading-7 text-gray-600 text-xl">Planned Demolitions <span className="hidden sm:inline">( A/O Nov 2023 )</span>     </dd>
            <dd className="relative z-10 text-base leading-7 text-gray-600 text-xl block sm:hidden">( A/O Nov 2023 )  </dd>
            1,910
          </dl>
        </div>
        <div className="relative mx-auto flex max-w-xs flex-col gap-y-4" data-aos="zoom-in-left" data-aos-duration="1000">
          <div className="absolute right-2 bottom-2 h-3/4 w-full rounded-lg bg-[#8ba2be] z-0"></div>
          <dl className="relative border border-black order-first z-10 mb-4 rounded-lg bg-white p-6 text-3xl font-semibold tracking-tight text-gray-900 shadow-md lg:text-7xl sm:text-3xl">
            <dt className="relative z-10 text-base leading-7 text-gray-600 text-xl">Community Feedback Surveys</dt>
            400+
          </dl>
        </div>
      </dl>
    )
}

export default CountyStats;