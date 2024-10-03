'use client';

import {
	FacebookShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	EmailShareButton,
	FacebookIcon,
	TwitterIcon,
	WhatsappIcon,
	EmailIcon,
} from 'react-share';

const ShareButtons = ({ property }) => {
	const shareUrl = `http://localhost:3000/properties/${property._id}`;

	return (
		<>
			<h3 className='text-xl font-bold text-center pt-2'>Share This Property</h3>
			<div className='flex gap-3 justify-center pb-5'>
				<FacebookShareButton
					url={shareUrl}
					quote={property.name}
					hashtag={`${property.type.trim()}ForRent`}
				>
					<FacebookIcon size={40} round />
				</FacebookShareButton>

				<TwitterShareButton
					url={shareUrl}
					title={property.name}
					hashtags={[`${property.type.trim()}ForRent`]}
				>
					<TwitterIcon size={40} round />
				</TwitterShareButton>

				<WhatsappShareButton url={shareUrl} title={property.name} separator='::'>
					<WhatsappIcon size={40} round />
				</WhatsappShareButton>

				<EmailShareButton
					url={shareUrl}
					subject={property.name}
					body={`Check out this property listing: ${shareUrl}`}
				>
					<EmailIcon size={40} round />
				</EmailShareButton>
			</div>
		</>
	);
};

export default ShareButtons;
