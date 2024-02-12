import React  from 'react'

export default function ContactPage() {

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
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
      <div className="mx-auto h-full max-w-2xl text-center md:h-[500px]">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact our office</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Send an email to <a href="mailto:dennis@dennistowns.com" className='font-bold hover:underline'> dennis@dennistowns.com</a>
        </p>
      </div>
    </div>
  )
}
