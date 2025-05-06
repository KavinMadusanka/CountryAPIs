import React from 'react';
import Layout from '../components/Layout';
import { FaGlobe, FaRocket, FaBookOpen } from 'react-icons/fa';

const About = () => {
  return (
    <Layout>
      <section className="min-h-screen py-20 px-4 sm:px-6 lg:px">
        <div className="max-w-6xl mx-auto z-10">
          {/* Header */}
          <div className="text-center mb-16 z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-teal-600 z-10">About WorldWise</h1>
            <p className="mt-4 text-gray-600 dark:text-teal-100 text-lg md:text-xl md:text-lg max-w-3xl mx-auto z-10">
              Discover the world one country at a time. WorldWise is a global exploration platform
              designed to help you learn about countries, cultures, and more — all in one place.
            </p>
          </div>

          {/* Card Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 z-10">
            {/* Card 1 */}
            <div className="bg-teal-50 dark:bg-gray-900/90 rounded-2xl p-6 shadow-md hover:scale-105 hover:shadow-lg transition duration-300 z-10">
              <div className="flex items-center justify-center mb-4 text-teal-600">
                <FaGlobe className="text-4xl" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-center text-teal-600  mb-2">Our Mission</h3>
              <p className="text-gray-600 dark:text-teal-100 text-center text-1xl md:text-lg">
                To create a simple and accessible tool for exploring the rich diversity of our world,
                providing essential facts in a beautifully designed interface.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-teal-50 dark:bg-gray-900/90 rounded-2xl p-6 shadow-md hover:shadow-lg hover:scale-105 transition duration-300 z-10">
              <div className="flex items-center justify-center mb-4 text-teal-600">
                <FaRocket className="text-4xl" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-center text-teal-600 mb-2">Why WorldWise?</h3>
              <p className="text-gray-600 dark:text-teal-100 text-center text-1xl md:text-lg">
                Unlike static resources, WorldWise offers interactive exploration with dynamic data
                and a focus on clarity, speed, and ease of use for curious minds.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-teal-50 dark:bg-gray-900/90 rounded-2xl p-6 shadow-md hover:scale-105 hover:shadow-lg transition duration-300 z-10">
              <div className="flex items-center justify-center mb-4 text-teal-600">
                <FaBookOpen className="text-4xl" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-center text-teal-600 mb-2">Learn by Discovery</h3>
              <p className="text-gray-600 dark:text-teal-100 text-center text-1xl md:text-lg">
                WorldWise turns geography into a journey. Whether you're learning languages, studying flags,
                or checking population stats, we make it engaging.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
