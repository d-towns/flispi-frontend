import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getEnvionmentApiUrl } from '../../utils/utils'
import { Blog } from '../../models/Blog.model'
import  Markdown from 'react-markdown'
import './BlogPage.css'

const BlogPage = () => {
  
  const [blog, setBlog] = useState<Blog>()
  const { id } = useParams<{ id: string }>()


  const fetchBlog = async () => {
    const response = await fetch(getEnvionmentApiUrl() + `/blog/${id}`)
    const data = await response.json()
    setBlog(data)
  }

  fetchBlog()


       return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-18 sm:py-24 lg:overflow-visible lg:px-0">
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
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-8">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-[#8ba2be]">{blog?.tag}</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{blog?.title} </h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                {blog?.subtitle}
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
              <Markdown>{blog?.body}</Markdown>
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