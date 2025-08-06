import React from 'react';

function About() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      {/* Top About Header */}
      <div className="mb-10 text-center">
        <p className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold">ABOUT</p>
      </div>

      {/* Three Section Row */}
      <div className="flex flex-col lg:flex-row justify-around items-start gap-10 mb-10">
        {/* First Card */}
        <div className="lg:w-1/3 w-full">
          <p className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4">US</p>
          <p className="mb-2 text-sm">
            📍 Welcome to NextGenWrites — a platform built for voices of the future.
          </p>
          <p className="text-sm">
            Whether you're a writer, thinker, developer, or reader, we give you the tools and space to publish your ideas and discover others. At NextGenWrites, we blend technology, creativity, and community — helping everyone share what matters.
          </p>
        </div>

        {/* Second Card */}
        <div className="lg:w-1/3 w-full">
          <img className="rounded-3xl w-full object-cover" src="/about_image.png" alt="About" />
        </div>

        {/* Third Card */}
        <div className="lg:w-1/3 w-full">
          <img className="rounded-3xl h-40 w-full object-cover mb-2" src="/about_image.png" alt="About Philosophy" />
          <p className="text-2xl font-bold mb-1">Our Philosophy</p>
          <p className="text-sm">
            We believe great content deserves a great platform. That’s why we created NextGenWrites — a space where ideas can grow, knowledge can spread, and writers can thrive. No noise, no fluff. Just meaningful blogs from future-minded people.
          </p>
        </div>
      </div>

      {/* Principals Section */}
      <div className="rounded-3xl px-6 py-10 mb-10" style={{ backgroundColor: '#ebe7e4' }}>
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left Person */}
          <div className="w-full lg:w-1/4 flex justify-center mb-8 lg:mb-0">
            <img src="/person1.png" alt="Left Person" className="h-64 object-contain rounded-xl" />
          </div>

          {/* Center Content */}
          <div className="w-full lg:w-1/2 text-center">
            <h1 className="text-4xl font-bold">MEET THE</h1>
            <h2 className="text-5xl font-extrabold mt-1">PRINCIPALS</h2>
            <div className="flex justify-center my-4">
              <img
                src="/about_image2.png"
                alt="Sofa"
                className="w-full max-w-md h-40 object-cover rounded-3xl"
              />
            </div>
            <p className="text-sm px-2">
              As principal and licensed designer, the founder oversees the day-to-day operations of NextGenWrites and the design and creation of our custom platform tools and community features.
            </p>
          </div>

          {/* Right Person */}
          <div className="w-full lg:w-1/4 flex justify-center mt-8 lg:mt-0">
            <img src="/person2.png" alt="Right Person" className="h-64 object-contain rounded-xl" />
          </div>
        </div>
      </div>

      {/* Names of Principals */}
      <div className="flex flex-col sm:flex-row justify-between mb-10 text-center sm:text-left">
        <div className="mb-4 sm:ml-10">
          <p className="text-2xl font-bold">Jay Britto</p>
          <p className="text-xl text-gray-400">FOUNDER AND PRINCIPAL</p>
        </div>
        <div className="sm:mr-10">
          <p className="text-2xl font-bold">David Charette</p>
          <p className="text-xl text-gray-400">FOUNDER AND PRINCIPAL</p>
        </div>
      </div>

      {/* Services Section */}
      <div className="flex flex-col lg:flex-row justify-around gap-10">
        {/* Left Side */}
        <div className="lg:w-1/2 w-full">
          <p className="text-4xl sm:text-5xl font-bold mb-4">OUR SERVICES</p>
          <p className="mb-4">
            At NextGenWrites, we offer a dynamic platform where users can write, publish, and explore blogs on a wide range of topics. From a smooth writing experience to content discovery and community interaction, we make sharing ideas simple and impactful.
          </p>
          <img src="/about_image.png" alt="Blog Image" className="rounded-3xl w-full object-cover" />
        </div>

        {/* Right Side */}
        <div className="lg:w-1/2 w-full flex flex-col gap-6">
          <div>
            <p className="text-2xl font-bold">📝 Start Writing</p>
            <p>
              Create a free account and begin publishing. Share tutorials, opinions, research, or anything you're passionate about.
            </p>
          </div>

          <div>
            <p className="text-2xl font-bold">🔍 Discover New Blogs</p>
            <p>
              Browse categories like tech, design, life, coding, productivity, AI, and more — written by people like you.
            </p>
          </div>

          <div>
            <p className="text-2xl font-bold">💬 Connect with Community</p>
            <p>
              Comment, follow, and interact with writers. Build your audience or learn from others.
            </p>
          </div>

          <div>
            <p className="text-2xl font-bold">📈 Grow as a Creator</p>
            <p>
              We support long-form writing, SEO features, clean formatting, and reader engagement tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
