import React, { useEffect, useState } from 'react'
import { Blog } from '../models/Blog.model';
import { fetchBlogs } from '../services/blog.service';
import { format, parseISO } from 'date-fns';

const BlogHome = () => {

  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchBlogData = async () => {
    const response = await fetchBlogs();
    setBlogs(response);
  }

  useEffect(() => {
    fetchBlogData();
  }, []);

  return (
<div className="text-gray-900 pt-12 pr-0 pb-14 pl-0 bg-white">
  <div className="w-full pt-4 pr-5 pb-6 pl-5 mt-0 mr-auto mb-0 ml-auto space-y-5 sm:py-8 md:py-12 sm:space-y-8 md:space-y-16
      max-w-7xl">
    <div className="flex flex-col items-center sm:px-5 md:flex-row">
      <div className="flex flex-col items-start justify-center w-full h-full pt-6 pr-0 pb-6 pl-0 mb-6 md:mb-0 md:w-1/2">
        <div className="flex flex-col items-start justify-center h-full space-y-3 transform md:pr-10 lg:pr-16
            md:space-y-5">
          <span className="text-4xl font-extrabold leading-none lg:text-5xl xl:text-7xl">Flint Property Search Blog</span>
          <div className="pt-2 pr-0 pb-0 pl-0">
            <p className="text-base font-normal leading-6 text-gray-600">A place to find news and updates about the Flint real estate market, as well as information about the Genesee County Land Bank’s programs and properties.</p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <div className="block">
          <img alt="commercial dump truck"
              src="/lb_4.jpeg" className="object-cover rounded-lg max-h-64 sm:max-h-96 btn- w-full h-full"/>
        </div>
      </div>
    </div>
    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
    {blogs.map((blog) => {
              return (
                <article className="flex max-w-xl flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                <span className="text-gray-500">{format(parseISO(blog.created_at), 'yyyy-MM-d')}</span>
                <a href={`/blog/${blog.slug}`} className="relative z-10 rounded-full bg-gray-100 shadow px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{blog.tag}</a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href={`/blog/${blog.slug}`}>
                    <span className="absolute inset-0"></span>
                    {blog.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{blog.subtitle}</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img src="DT_BULB_DARK.png" alt="" className="h-16 w-16 rounded-full bg-gray-50" />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900 text-lg">
                    <a href={`/blog/${blog.slug}`}>
                      <span className="absolute inset-0 text-xl"></span>
                      {blog.author}
                    </a>
                  </p>
                </div>
              </div>
            </article>
              )
            })}
          </div>
  </div>
</div>
  )
}

export default BlogHome
