import React from 'react'

function About() {
  return (
    <>
        <div className='w-[1200px] mx-auto'>
          <div className='mb-10'>
            <p className='text-9xl font-bold'>ABOUT</p>
            <div className='flex justify-around items-center gap-4 h-72'>
              {/* First Card */}
              <div className='w-[1000px] p-2'>
                <p className='text-9xl font-bold'>US</p>
                <p className='mt-2 mb-2 text-sm'>📍 Welcome to NextGenWrites — a platform built for voices of the future.</p>
                <p className='text-sm'>Whether you're a writer, thinker, developer, or reader, we give you the tools and space to publish your ideas and discover others.At NextGenWrites, we blend technology, creativity, and community — helping everyone share what matters.
                </p>
              </div>
              {/* Second Card */}
              <div className='w-[1000px] p-2'>
                <img className='rounded-4xl' src="/about_image.png" alt="Blog Image" />
              </div>
              {/* Third Card */}
              <div className='w-[1000px] p-2'>
                <img className='rounded-4xl h-30 w-96 object-cover' src="/about_image.png" alt="Blog Image" />
                <p className='text-2xl font-bold'>Our Philosophy</p>
                <p className='text-sm'>We believe great content deserves a great platform.
                  That’s why we created NextGenWrites — a space where ideas can grow, knowledge can spread, and writers can thrive. No noise, no fluff. Just meaningful blogs from future-minded people.
                </p>
              </div>
            </div>
          </div>

          <div className="h-96 mb-5 rounded-4xl px-6 py-4" style={{ backgroundColor: '#ebe7e4' }}>
            <div className="flex items-end justify-between h-full">
              
              {/* Left Person Image */}
              <div className="w-1/4 flex justify-center">
                <img
                  src="/person1.png"
                  alt="Left Person"
                  className="h-[100%] object-contain self-end rounded-t-xl rounded-b-xl"
                />
              </div>

              {/* Center Content */}
              <div className="w-1/2 text-center mb-4">
                <h1 className="text-4xl font-bold">MEET THE</h1>
                <h2 className="text-5xl font-extrabold mt-1">PRINCIPALS</h2>
                <div className="flex justify-center my-3 ">
                  <img src="/about_image2.png" alt="Sofa" className="w-1/2 object-cover h-40 w-[500px] rounded-4xl" />
                </div>
                <p className="text-sm px-4">
                  As principal and licensed designer, the founder oversees the day-to-day operations of Britto Charette and the design and manufacture of our firm’s custom furniture and award-winning accessories.
                </p>
              </div>

              {/* Right Person Image */}
              <div className="w-1/4 flex justify-center ">
                <img
                  src="/person2.png"
                  alt="Right Person"
                  className="h-[85%] object-contain self-end rounded-t-xl rounded-b-xl"
                />
              </div>

            </div>
          </div>

          <div>
            <div className='flex justify-between'>
              <div className='ml-10'>
                <p className='text-2xl font-bold'>Jay Britto</p>
                <p className='text-xl text-gray-400'>FOUNDER AND PRINCIPAL</p>
              </div>
              <div className='mr-10'>
                <p className='text-2xl font-bold'>David Charette</p>
                <p className='text-xl text-gray-400'>FOUNDER AND PRINCIPAL</p>
              </div>
            </div>
          </div>

          <div>
            <div className='flex justify-around mt-10 mb-10'>
              <div className='w-[500px]'>
                <p className='text-5xl font-bold mb-2'>OUR SERVICES</p>
                <p className=' mb-2'>At NextGenWrites, we offer a dynamic platform where users can write, publish, and explore blogs on a wide range of topics. From a smooth writing experience to content discovery and community interaction, we make sharing ideas simple and impactful.</p>
                <img src="/about_image.png" alt="Blog Image" className='rounded-4xl' />
              </div>
              <div className='w-[500px] flex justify-center flex-col gap-8'>
                {/* First Box */}
                <div>
                  <p className='text-2xl font-bold'>📝 Start Writing</p>
                  <p>Create a free account and begin publishing. Share tutorials, opinions, research, or anything you're passionate about.</p>
                </div>

                {/* Second Box */}
                <div>
                  <p className='text-2xl font-bold'>🔍 Discover New Blogs</p>
                  <p>Browse categories like tech, design, life, coding, productivity, AI, and more — written by people like you.</p>
                </div>

                {/* Third Box */}
                <div>
                  <p className='text-2xl font-bold'>💬 Connect with Community</p>
                  <p>Comment, follow, and interact with writers. Build your audience or learn from others.</p>
                </div>

                {/* Fourth Box */}
                <div>
                  <p className='text-2xl font-bold'>📈 Grow as a Creator</p>
                  <p>We support long-form writing, SEO features, clean formatting, and reader engagement tools.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default About