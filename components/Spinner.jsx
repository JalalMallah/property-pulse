'use client';

import ClipLoader from 'react-spinners/ClipLoader';

const cssOverride = {
	display: 'block',
	margin: '0px auto',
};

const Spinner = () => {
	return (
		<ClipLoader
			color='#3b82f6'
			cssOverride={cssOverride}
			size={50}
			aria-label='Loading Spinner'
		/>
	);
};

export default Spinner;
