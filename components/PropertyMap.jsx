'use client';

import { useEffect, useState } from 'react';
import { setDefaults, fromAddress } from 'react-geocode';
import Map, { Marker } from 'react-map-gl';
import Image from 'next/image';
import Spinner from './Spinner';
import pin from '@/assets/images/pin.svg';

import 'mapbox-gl/dist/mapbox-gl.css';

const PropertyMap = ({ property }) => {
	const [lat, setLat] = useState(null);
	const [lng, setLng] = useState(null);
	const [viewport, setViewport] = useState({
		latitude: 0,
		longitude: 0,
		zoom: 12,
		width: '100%',
		height: '500px',
	});
	const [isLoading, setIsLoading] = useState(true);
	const [geocodeError, setGeocodeError] = useState(false);

	setDefaults({
		key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
		language: 'en',
		region: 'us',
	});

	useEffect(() => {
		const fetchCoords = async () => {
			const { location } = property;
			const address = `${location.street} ${location.city} ${location.state} ${location.zipcode}`;

			try {
				const response = fromAddress(address);

				if (!response.results || response.results.length === 0) {
					setGeocodeError(true);

					return;
				}

				const { lat, lng } = response.results[0].geometry.location;

				setLat(lat);
				setLng(lng);
				setViewport({
					...viewport,
					latitude: lat,
					longitude: lng,
				});
			} catch (error) {
				console.error(error);
				setGeocodeError(true);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCoords();
	}, []);

	if (isLoading) return <Spinner />;

	if (geocodeError) return <div className='text-xl'>No location data found</div>;

	return (
		!isLoading && (
			<Map
				mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
				mapLib={import('mapbox-gl')}
				initialViewState={{
					longitude: lng,
					latitude: lat,
					zoom: 15,
				}}
				style={{ width: '100%', height: 500 }}
				mapStyle='mapbox://styles/mapbox/streets-v9'
			>
				<Marker latitude={lat} longitude={lng} anchor='bottom'>
					<Image src={pin} alt='location' width={40} height={40} />
				</Marker>
			</Map>
		)
	);
};

export default PropertyMap;
