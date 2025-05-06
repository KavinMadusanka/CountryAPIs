import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { SlArrowLeftCircle } from "react-icons/sl";

const NotFound = () => {
  return (
    <Layout>
        <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
            <h1 className="text-5xl lg:text-8xl font-bold text-teal-600 mb-4">404</h1>
            <h2 className="text-xl lg:text-3xl font-medium dark:text-teal-600 text-gray-800 mb-2">Page Not Found</h2>
            <p className="text-gray-600 dark:text-teal-100 mb-6 text-sm font-medium">Sorry, the page you are looking for doesn’t exist or has been moved.</p>
            <Link
            to="/"
            className="inline-flex items-center gap-2 font-medium bg-teal-600 hover:bg-teal-700 text-white dark:text-teal-100 dark:bg-teal-800 dark:hover:bg-teal-900 lg:text-xl text-sm font-bold px-6 py-2 rounded-md transition"
            ><SlArrowLeftCircle className='size-5 lg:size-7'/>
            Go Back Home
            </Link>
        </div>
        </div>
    </Layout>
  );
};

export default NotFound;
