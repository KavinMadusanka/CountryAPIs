import React from 'react'
import Layout from '../components/Layout';
import { SlArrowRightCircle } from "react-icons/sl";
import homeImage from '../assets/HomeImage.png'

const Homepage = () => {
  return (
    <Layout>
        <section className='container mx-auto flex flex-col md:flex-row justify-between items-center 
        pt-25 pb-6 px-4 sm:px-6 lg:px-8'>
            {/* left side  */}
            <div className='w-full md:w-1/2 space-y-8 z-10'>
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-50 to-teal-100 text-gray-600 font-semibold text-sm md:text-xl px-4 py-2 rounded-full shadow-sm">
                <span>🌍 Explore smarter. Discover deeper. Travel with <span className="text-teal-800 font-bold">WorldWise</span>.</span>
            </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-600">
                    Travel smarter with <br/>
                    <div className='flex items-center gap-2'>
                    <img src='/LogoWorldWiss.png' alt='Logo' className='w-10 h-10' />
                    <span className="text-teal-600">WorldWise</span> —
                    </div>
                    your guide to global discovery.
                </h1>
                <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-xl">
                    Discover essential insights about countries around the world — from languages and populations to national flags and more. WorldWise empowers you to explore global cultures, plan smarter travels, and broaden your understanding of the world, one destination at a time.
                </p>

                <a href="/Countries" className="text-sm lg:text-xl font-medium inline-flex items-center gap-2 mt-4 bg-teal-600 text-white px-10 py-3 rounded-lg hover:bg-teal-700 transition">
                    Learn More 
                    <SlArrowRightCircle className='size-5 lg:size-7'/>
                </a>
            </div>

            {/* right side  */}
            <div className='w-full md:w-1/2 mt-16 md:mt-0 pl-0 md:pl-12' >
            <div className='relative '>
                <img src={homeImage} alt='Home Image' className='rounded-lg relative z-10 hover:scale-[1.02] transition-transform duration-300'/>
            </div>
            </div>

        </section>
    </Layout>
  )
}

export default Homepage;