import React, { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getEnvironmentApiUrl } from '../../utils/utils'
import { Blog } from '../../models/Blog.model'
import Markdown from 'react-markdown'
import './BlogPage.css'

const BlogPage = () => {

  const [blog, setBlog] = useState<Blog>()
  const { slug } = useParams<{ slug: string }>()

  const fetchBlog = useCallback( async () => {
    const response = await fetch(getEnvironmentApiUrl() + `/blog/${slug}`)
    const data = await response.json()
    setBlog(data)
  },[slug])

  React.useEffect(() => {
    fetchBlog()
  }, [fetchBlog])

  return (
    <div>
    <div className="py-10 w-4/6 mx-auto blog-container">

      <div className="mb-4 md:mb-0 w-full mx-auto relative">
        <div className="px-4 lg:px-0">
          <h1 className="text-4xl font-bold text-gray-800 leading-tight">
            {blog?.title}
          </h1>
          <h2 className="text-xl w-5/6 font-semibold text-gray-800 leading-tight">
            {blog?.subtitle}</h2>

          <span
            className="py-2 text-[#003366] inline-flex items-center justify-center mb-2"
          >
            {blog?.tag}
          </span>
        </div>

        <img src="/lb_4.jpeg" alt="demolition vehicle" className="h-48 w-full object-cover lg:rounded" />
      </div>

      <div className="flex flex-col lg:flex-row lg:space-x-12">

        <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">

          <Markdown>{blog?.body}</Markdown>
        </div>

        <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
          <div className="p-4 border-t border-b md:border md:rounded-lg">
            <div className="flex py-2">
              <img src='/dennis_beach.JPG' alt="demolition vehicle"
                className="h-10 w-10 rounded-full mr-2 object-cover" />
              <div>
                <p className="font-semibold text-gray-700 text-sm"> {blog?.author} </p>
                <p className="font-semibold text-gray-600 text-xs"> Author </p>
              </div>
            </div>
            <p className="text-gray-700 py-3">
              Dennis is a software engineer and entrepreneur. He is the founder of Flint Property Search and has been working on the project since 2023.
            </p>
            <a href="https://twitter.com/dennis_exe_" className="px-2 py-1 text-gray-100 bg-[#003366] flex w-full items-center justify-center rounded">
              Follow
              <i className='bx bx-user-plus ml-2' ></i>
            </a>
          </div>
        </div>

      </div>
    </div>
    </div>
  )
}

export default BlogPage