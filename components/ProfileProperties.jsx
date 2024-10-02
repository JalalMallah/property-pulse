'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import deleteProperty from '@/app/actions/deleteProperty';
import { toast } from 'react-toastify';

const ProfileProperties = ({ properties: initialProperties }) => {
	const [properties, setProperties] = useState(initialProperties);

	const handleDeleteProperty = async propertyId => {
		const isConfirmed = window.confirm(
			'Are you sure you want to delete this property?'
		);

		if (!isConfirmed) return;

		await deleteProperty(propertyId);

		const filteredProperties = properties.filter(
			property => property._id !== propertyId
		);

		setProperties(filteredProperties);
		toast.success('Property Deleted Successfully');
	};

	const mappedProperties = properties.map(property => {
		const { location, name, images, _id: propertyId } = property;
		const address = `${location.street} ${location.city}`;

		return (
			<div key={propertyId} className='mb-10'>
				<Link href={`/properties/${propertyId}`}>
					<Image
						className='h-32 w-full rounded-md object-cover'
						src={images[0]}
						alt=''
						width={0}
						height={0}
						sizes='100vw '
					/>
				</Link>
				<div className='mt-2'>
					<p className='text-lg font-semibold'>{name}</p>
					<p className='text-gray-600'>Address: {address}</p>
				</div>
				<div className='mt-2'>
					<Link
						href={`/properties/${propertyId}/edit`}
						className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'
					>
						Edit
					</Link>
					<button
						className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
						type='button'
						onClick={() => handleDeleteProperty(propertyId)}
					>
						Delete
					</button>
				</div>
			</div>
		);
	});

	return <>{mappedProperties}</>;
};

export default ProfileProperties;
