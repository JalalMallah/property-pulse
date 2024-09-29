import { Schema, model, models } from 'mongoose';

const PropertySchema = new Schema(
	{
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		name: {
			type: String,
			requried: true,
		},
		type: {
			type: String,
			requried: true,
		},
		description: {
			type: String,
		},
		location: {
			street: String,
			city: String,
			state: String,
			zipcode: String,
		},
		beds: {
			type: Number,
			required: true,
		},
		baths: {
			type: Number,
			required: true,
		},
		square_feet: {
			type: Number,
			required: true,
		},
		amenities: [
			{
				type: String,
			},
		],
		rates: {
			nightly: Number,
			weekly: Number,
			monthly: Number,
		},
		seller_info: {
			name: String,
			email: String,
			phone: String,
		},
		images: [
			{
				type: String,
			},
		],
		is_featured: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true, // This will allow 'createdAt' and 'updatedAt' fields to be added
	}
);

const Property = models.Property || model('Property', PropertySchema);

export default Property;
