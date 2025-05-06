import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import FilterMenu from '../components/FilterMenu';
import { SlStar } from 'react-icons/sl';
import { Star, StarOff } from 'lucide-react';
import { IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { toast } from 'react-hot-toast';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [allCountries, setAllCountries] = useState([]);
  const [favoriteCodes, setFavoriteCodes] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate hook

  const fetchAllCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      setAllCountries(data);
      setCountries(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching countries:', error);
      setLoading(false);
    }
  };

  const fetchCountriesByName = async () => {
    if (!searchQuery.trim()) {
      applyFilters(allCountries);
      return;
    }

    const url = `https://restcountries.com/v3.1/name/${searchQuery}`;

    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) throw new Error('Country not found');
      const data = await response.json();
      applyFilters(data);
    } catch (error) {
      console.error('Search error:', error);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (countryList) => {
    let filtered = [...countryList];

    if (regionFilter) {
      filtered = filtered.filter((country) => country.region === regionFilter);
    }

    setCountries(filtered);
  };

  useEffect(() => {
    fetchAllCountries();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const delayDebounce = setTimeout(() => {
        fetchCountriesByName();
      }, 500);
      return () => clearTimeout(delayDebounce);
    } else {
      fetchAllCountries();
    }
  }, [searchQuery]);

  useEffect(() => {
    applyFilters(allCountries);
  }, [regionFilter]);

  // Extract unique regions
  const uniqueRegions = [...new Set(allCountries.map(c => c.region).filter(Boolean))];

  const handleCardClick = (country) => {
    navigate(`/country-details/${country.cca3}`); // Navigate to the country details page using country code
  };

  const handleToggleFavorite = async (e, countryCode) => {
    e.stopPropagation(); // prevent triggering card click navigation
  
    const isFavorited = favoriteCodes.includes(countryCode);
  
    try {
      const res = await fetch(
        `https://countryapis-backend.onrender.com/api/v1/auth/favorites${isFavorited ? `/${countryCode}` : ''}`,
        {
          method: isFavorited ? 'DELETE' : 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          ...(isFavorited
            ? {} // no body for DELETE
            : { body: JSON.stringify({ countryCode }) }),
        }
      );
  
      const data = await res.json();
      console.log(data);
  
      if (data.success) {
        setFavoriteCodes(prev =>
          isFavorited
            ? prev.filter(code => code !== countryCode)
            : [...prev, countryCode]
        );
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to update favorites');
    }
  };
  

  const fetchUserFavorites = async () => {
    try {
      const res = await fetch('https://countryapis-backend.onrender.com/api/v1/auth/getfavorites', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        // Assuming the backend returns favorites as array of country objects or codes
        const codes = data.favorites.map(fav => fav.countryCode);
        setFavoriteCodes(codes);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    }
  };

  useEffect(() => {
    fetchUserFavorites();
  }, []);
  
  

  return (
    <Layout>
      <section className="py-5 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl sm:text-4xl font-bold text-teal-600 text-center mb-6">
            Country Flags
          </h1>

          {/* Search and Filter UI */}
          <div className="flex flex-wrap items-center justify-start gap-2 mb-10">
            <input
              type="text"
              placeholder="Search by country name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 min-w-[150px] px-4 py-2 border border-teal-200 dark:border-gray-900/40 rounded-md bg-teal-50/40 
              hover:bg-teal-100/30 dark:bg-gray-900/20 dark:hover:bg-gray-900/40 text-teal-800 dark:text-teal-100
              shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-gray-300 z-10"
            />
            <FilterMenu
              label="Filter by Region"
              options={uniqueRegions}
              selected={regionFilter}
              onSelect={setRegionFilter}
            />
            <button
              onClick={() => setShowFavoritesOnly(prev => !prev)}
              title="Show Favorites Only"
              className={`flex items-center gap-1 px-1.5 py-1.5 rounded-md shadow-sm border 
                border-teal-600 hover:border-teal-700 transition bg-teal-600 hover:bg-teal-700 
                dark:border-teal-800 dark:hover:border-teal-900 dark:bg-teal-800 dark:hover:bg-teal-900 dark:text-teal-100 z-13 
                ${showFavoritesOnly ? 'border-teal-600 text-amber-300' : 'bg-white-500 border-teal-500 text-white'}
              `}
            >
              <Star className="text-lg fill-current" />
              <span className="hidden sm:inline text-white dark:text-teal-100">
                {showFavoritesOnly ? 'Showing Favorites' : 'Favorites Only'}
              </span>
            </button>
          </div>

          {/* Country Cards */}
          {loading ? (
            <div className="text-center text-teal-600 dark:text-teal-100 text-lg">Loading countries...</div>
          ) : countries.length === 0 ? (
            <div className="text-center text-red-500">No countries found.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 z-10">
              {(showFavoritesOnly
                ? countries.filter(c => favoriteCodes.includes(c.cca3))
                : countries
              ).map((country, index) => (
                <div
                  key={index}
                  className="relative bg-gradient-to-r from-teal-50/50 to-teal-100/90 dark:from-gray-600/50 dark:to-gray-700/50 rounded-lg shadow-sm hover:shadow-md p-4 text-center transition z-10"
                  onClick={() => handleCardClick(country)} // Navigate to country details page when clicked
                >
                  <button
                    className={`absolute top-2 right-2 p-2 rounded-full transition 
                      ${favoriteCodes.includes(country.cca3) 
                        ? 'bg-white/60 hover:bg-amber-100/60 dark:bg-gray-400/60' 
                        : 'bg-white/60 hover:bg-amber-100/60 dark:bg-gray-400/60'
                      }`}
                    title={favoriteCodes.includes(country.cca3) ? "Remove from favorites" : "Add to favorites"}
                    onClick={(e) => handleToggleFavorite(e, country.cca3)}
                  >
                    <Star
                      className={`text-lg 
                        ${favoriteCodes.includes(country.cca3) 
                          ? 'text-amber-300 fill-current' 
                          : 'text-amber-300 fill-amber'
                        }`}
                    />
                  </button>



                  <img
                    src={country.flags.svg}
                    alt={`Flag of ${country.name.common}`}
                    className="w-full h-32 object-contain mb-2"
                  />
                  <h3 className="text-sm md:text-lg font-medium text-teal-600 dark:text-teal-100">
                    {country.name.common}
                  </h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Countries;
