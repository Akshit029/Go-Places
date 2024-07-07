import React, { useState } from 'react';
import { useLoadScript, GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';
import NavBar from '../NavBar/NavBar';

const libraries = ["places"];

const HomePage = () => {
  const [currentLocation, setCurrentLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [price, setPrice] = useState(null);
  const [currentLocationCoords, setCurrentLocationCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.AIzaSyB9KjsOtk6nRAyzG4gD3P13Pi1QTen9Yn8, // Replace with your API key
    libraries,
  });

  const calculateDistance = (startCoords, endCoords) => {
    const { lat: lat1, lng: lng1 } = startCoords;
    const { lat: lat2, lng: lng2 } = endCoords;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    return distance;
  };

  const calculatePrice = (startCoords, endCoords) => {
    const distance = calculateDistance(startCoords, endCoords);
    if (distance <= 2) {
      return 30;
    }
    return 30 + (distance - 2) * 15;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentLocationCoords && destinationCoords) {
      const calculatedPrice = calculatePrice(currentLocationCoords, destinationCoords);
      setPrice(calculatedPrice);
    } else {
      console.error('Please select both current location and destination');
    }
  };

  const handlePlaceChanged = (setLocation, setCoords) => {
    return (autocomplete) => {
      const place = autocomplete.getPlace();
      if (place && place.formatted_address && place.geometry) {
        setLocation(place.formatted_address);
        setCoords({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      } else {
        console.error('Invalid place object', place);
      }
    };
  };

  const handleCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentLocationCoords({ lat: latitude, lng: longitude });
      setCurrentLocation(`Current Location (${latitude}, ${longitude})`);
    });
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps</div>;

  return (
    <div>
      <NavBar />
      <div className="bg-black text-white">

        {/* Hero Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center font-mono">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Go Places</h1>
            <p className="text-lg md:text-xl mb-8">Your ultimate destination for eco-friendly rides.</p>
            <a href="/signup" className="bg-white text-black py-3 px-6 rounded-full text-lg hover:bg-gray-200">Get Started</a>
          </div>
        </section>
      </div>

      {/* Location Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-left mb-8">Calculate Your Ride Price</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="currentLocation" className="block text-lg mb-2">Current Location</label>
                  <Autocomplete onLoad={(autocomplete) => autocomplete.addListener('place_changed', () => handlePlaceChanged(setCurrentLocation, setCurrentLocationCoords)(autocomplete))}>
                    <input
                      type="text"
                      id="currentLocation"
                      value={currentLocation}
                      onChange={(e) => setCurrentLocation(e.target.value)}
                      className="w-full px-3 py-2 rounded-full text-black"
                      required
                    />
                  </Autocomplete>
                  <button
                    type="button"
                    onClick={handleCurrentLocation}
                    className="bg-white text-black mt-3 py-2 px-4 rounded-full hover:bg-gray-200 transition ml-2"
                  >
                    Use Current Location
                  </button>
                </div>
                <div>
                  <label htmlFor="destination" className="block text-lg mb-2">Destination</label>
                  <Autocomplete onLoad={(autocomplete) => autocomplete.addListener('place_changed', () => handlePlaceChanged(setDestination, setDestinationCoords)(autocomplete))}>
                    <input
                      type="text"
                      id="destination"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full px-3 py-2 rounded-full text-black"
                      required
                    />
                  </Autocomplete>
                </div>
                <button
                  type="submit"
                  className="bg-white text-black py-2 px-4 rounded-full hover:bg-gray-200 transition"
                >
                  Calculate Price
                </button>
              </form>
              {price !== null && (
                <div className="mt-8 font-semibold text-2xl text-white">
                  <p>The estimated price for your ride is: ₹{price.toFixed(2)}</p>
                </div>
              )}
            </div>
            <div className="w-full h-64 md:w-full md:h-96">
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={{ lat: 0, lng: 0 }}
                zoom={2}
              >
                {currentLocationCoords && <Marker position={currentLocationCoords} />}
                {destinationCoords && <Marker position={destinationCoords} />}
              </GoogleMap>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="bg-white text-black p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Electric Sedans</h3>
              <p className="mb-4">Comfortable rides for everyday commuting.</p>
              <a href="#" className="text-black hover:text-gray-800">Learn More</a>
            </div>
            {/* Service Card 2 */}
            <div className="bg-white text-black p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Electric SUVs</h3>
              <p className="mb-4">Spacious vehicles for group travel.</p>
              <a href="#" className="text-black hover:text-gray-800">Learn More</a>
            </div>
            {/* Service Card 3 */}
            <div className="bg-white text-black p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Electric Bikes</h3>
              <p className="mb-4">Efficient rides for short distances.</p>
              <a href="#" className="text-black hover:text-gray-800">Learn More</a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">What Our Customers Say</h2>
          <div className="flex flex-col md:flex-row items-center md:space-x-8">
            {/* Testimonial Card 1 */}
            <div className="bg-white text-black p-6 rounded-lg shadow-md max-w-sm md:flex-1 mb-8 md:mb-0">
              <p className="mb-4">"Great service! The electric sedan was clean and comfortable. Will definitely use again!"</p>
              <p className="text-sm font-semibold">- Emily T.</p>
            </div>
            {/* Testimonial Card 2 */}
            <div className="bg-white text-black p-6 rounded-lg shadow-md max-w-sm md:flex-1">
              <p className="mb-4">"Awesome experience with the electric SUV. Perfect for our family outing!"</p>
              <p className="text-sm font-semibold">- John D.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-4 bg-black text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>&copy; 2023 Go Places. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
