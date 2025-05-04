import { Layout } from 'lucide-react';
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
        <div className="pt-32 pb-20 px-4 sm:px-10 lg:px-20 bg-white min-h-screen">
        <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-teal-600 mb-4">Our Services</h2>
            <p className="text-gray-600 text-lg">Explore the core services we offer to empower your global knowledge journey.</p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-xl shadow-md p-6 text-center transition-transform hover:scale-105 hover:shadow-lg">
                <div className="mb-4 flex justify-center">{service.icon}</div>
                <h3 className="text-xl font-semibold text-teal-700 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
            </div>
            ))}
        </div>
        </div>
    </Layout>
  );
};

export default OurService;
