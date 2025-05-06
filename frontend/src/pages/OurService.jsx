import Layout from '../components/Layout';
import React from 'react';
import { FaGlobe, FaUsers, FaChartLine } from 'react-icons/fa';

const services = [
  {
    title: 'Global Insights',
    description: 'Access reliable country data, economic stats, and global insights all in one place.',
    icon: <FaGlobe className="text-teal-600 text-4xl" />,
  },
  {
    title: 'User-Centric Experience',
    description: 'Customized features and seamless navigation for a better user experience.',
    icon: <FaUsers className="text-teal-600 text-4xl" />,
  },
  {
    title: 'Real-time Analytics',
    description: 'Track and monitor real-time updates and trends with dynamic dashboards.',
    icon: <FaChartLine className="text-teal-600 text-4xl" />,
  },
];

const OurService = () => {
  return (
    <Layout>
        <div className="pt-32 pb-20 px-4 sm:px-10 lg:px-20 min-h-screen">
        <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-teal-600 mb-4">Our Services</h2>
            <p className="text-gray-600 dark:text-teal-100 text-lg">Explore the core services we offer to empower your global knowledge journey.</p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 z-15  ">
            {services.map((service, index) => (
            <div key={index} className="bg-teal-50 dark:bg-gray-900/90 border border-gray-100 dark:border-gray-900/9 rounded-xl shadow-md p-6 text-center transition-transform hover:scale-105 hover:shadow-lg z-10 ">
                <div className="mb-4 flex justify-center">{service.icon}</div>
                <h3 className="text-xl font-semibold text-teal-600 mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-teal-100">{service.description}</p>
            </div>
            ))}
        </div>
        </div>
    </Layout>
  );
};

export default OurService;
