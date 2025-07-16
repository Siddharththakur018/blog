import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function BlogBanner() {
  const slides = [
    {
      image:
        'https://jevelin.shufflehound.com/blog1/wp-content/uploads/sites/11/2016/11/3-1024x817.jpg',
      title: 'Discover Creative Ideas',
      description: 'Unleash inspiration and explore insights from top industry minds.',
    },
    {
      image:
        'https://jevelin.shufflehound.com/blog1/wp-content/uploads/sites/11/2016/11/6-1024x682.jpg',
      title: 'Learn From Experts',
      description: 'Tips, guides, and stories curated for lifelong learners and creators.',
    },
    {
      image:
        'https://jevelin.shufflehound.com/blog1/wp-content/uploads/sites/11/2016/11/2-1024x682.jpg',
      title: 'Stay Ahead in Tech',
      description: 'From web trends to AI – dive deep into the future of technology.',
    },
    {
      image:
        'https://jevelin.shufflehound.com/blog1/wp-content/uploads/sites/11/2016/11/1-1024x682.jpg',
      title: 'Grow With Every Read',
      description: 'Read more, know more, grow more. Empower your curiosity.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Optional: Auto-play every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[480px] overflow-hidden rounded-none sm:rounded-lg shadow-lg mb-12">
      {/* Background Image */}
      <img
        src={slides[currentIndex].image}
        alt={slides[currentIndex].title}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      {/* Slide Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-6 md:px-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 drop-shadow-lg">
          {slides[currentIndex].title}
        </h2>
        <p className="text-base sm:text-lg max-w-2xl text-gray-200 drop-shadow">
          {slides[currentIndex].description}
        </p>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-md shadow transition"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-md shadow transition"
      >
        <FiChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-5 w-full flex justify-center gap-2 z-10">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-white' : 'bg-white/40'
            } transition duration-300`}
          />
        ))}
      </div>
    </div>
  );
}

export default BlogBanner;
