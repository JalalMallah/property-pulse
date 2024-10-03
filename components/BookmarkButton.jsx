'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import bookmarkProperty from '@/app/actions/bookmarkProperty';
import checkBookmarkStatus from '@/app/actions/checkBookmarkStatus';
import { toast } from 'react-toastify';
import { FaBookmark } from 'react-icons/fa';

const BookmarkButton = ({ property }) => {
	const [isBookmarked, setIsBookmarked] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const { data: session } = useSession();
	const userId = session?.user?.id;

	const handleClick = async () => {
		if (!userId) {
			toast.error('You need to be signed in to bookmark a listing');
		}

		bookmarkProperty(property._id).then(res => {
			if (res.error) return toast.error(res.error);

			setIsBookmarked(res.isBookmarked);
			toast.success(res.message);
		});
	};

	useEffect(() => {
		if (!userId) {
			return setIsLoading(false);
		}

		checkBookmarkStatus(property._id).then(res => {
			if (res.error) toast.error(res.error);

			setIsBookmarked(res.isBookmarked);
			setIsLoading(false);
		});
	}, [property._id, userId, checkBookmarkStatus]);

	if (isLoading) return <p className='text-center'>Loading...</p>;

	return isBookmarked ? (
		<button
			className='bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
			onClick={handleClick}
		>
			<FaBookmark className='mr-2' /> Remove Bookmark
		</button>
	) : (
		<button
			className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
			onClick={handleClick}
		>
			<FaBookmark className='mr-2' /> Bookmark Property
		</button>
	);
};

export default BookmarkButton;
