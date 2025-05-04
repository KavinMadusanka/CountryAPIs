import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';

const CountryDetailsPage = () => {
  const { countryCode } = useParams(); // Get the country code from the URL
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        console.log(countryCode)
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        if (!response.ok) throw new Error('Country not found');
        const data = await response.json();
        setCountry(data[0]);
      } catch (error) {
        console.error('Error fetching country details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [countryCode]);

  console.log(country);

  return (
    <Layout>
        <div className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {loading? (
            <div className="text-center text-teal-600 text-lg">Loading country Details...</div>
          ) : (
            <section className='container mx-auto flex flex-col md:flex-row justify-between items-start pt-5 pb-6 px-4 sm:px-6 lg:px-8'>

              {/* left side  */}
              <div className='w-full md:w-1/2 space-y-8 z-10'>
                <div className='relative '>
                  <img src={country.flags.svg} alt='Country image' className='rounded-lg relative z-10 hover:scale-[1.03] transition-transform duration-300'/>
                </div>
                <div className='text-center'>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-600">{country.name.common}</h1>
                </div>
                {/* Country Information */}
                <div className="bg-teal-50/80 rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-teal-600">Names</h2>
                  <p><strong>Common Name:</strong> {country.name.common}</p>
                  <p><strong>Official Name:</strong> {country.name.official}</p>
                  <p><strong>Official Name (Native):</strong> {
                    country.name.nativeName
                      ? Object.values(country.name.nativeName)[0]?.official || 'N/A'
                      : 'N/A'}
                  </p>
                      
                </div>

                <div className="bg-teal-50/80 rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-teal-600">Flag Description:</h2>
                  <p><strong>{country.flags.alt}</strong></p>
                </div>
              </div>

              {/* right side  */}
                  <div className='w-full md:w-1/2 space-y-8 pl-0 md:pl-12 py-5 z-10' >
                    {/* Country Information */}
                    <div className="bg-teal-50/80 rounded-lg shadow-lg p-6">
                      <h2 className="text-xl font-semibold text-teal-600">Geography</h2>
                      <p><strong>Region:</strong> {country.region}</p>
                      <p><strong>Subregion:</strong> {country.subregion}</p>
                      <p><strong>Capital:</strong> {country.capital ? country.capital.join(', ') : 'N/A'}</p>
                      <p><strong>Area:</strong> {country.area} km<sup>2</sup></p>
                      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                      <p><strong>Borders:</strong> {country.borders ? country.borders.join(', ') : 'N/A'}</p>
                      <p><strong>Google Maps:</strong> <a
                        href={country.maps.googleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 underline hover:text-teal-800">
                          View on GoogleMaps
                      </a></p>
                      <p><strong>Street Maps:</strong> <a
                        href={country.maps.openStreetMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 underline hover:text-teal-800">
                          View on openStreetMaps
                      </a></p>
                    </div>

                    <div className="bg-teal-50/80 rounded-lg shadow-lg p-6">
                      <h2 className="text-xl font-semibold text-teal-600">Languages</h2>
                      <p>{country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
                    </div>

                    <div className="bg-teal-50/80 rounded-lg shadow-lg p-6">
                      <h2 className="text-xl font-semibold text-teal-600">Codes</h2>
                      <p><strong>Country Code:</strong> {country.cca3}</p>
                      <p><strong>International calling code:</strong> {country.idd ? `${country.idd.root}${country.idd.suffixes[0]}` : 'N/A'}</p>
                      <p><strong>Currency code:</strong> {country.currencies ? Object.keys(country.currencies).join(', ') : 'N/A'}</p>
                      <p><strong>Currencies:</strong> 
                        {country.currencies
                          ? Object.entries(country.currencies).map(([code, { name, symbol }]) => (
                              <span key={code}>{name} ({symbol}) </span>
                            ))
                          : 'N/A'}
                      </p>

                    </div>
                  </div>
              </section>
          )}
        </div>
        </div>
    </Layout>
  );
};

export default CountryDetailsPage;
