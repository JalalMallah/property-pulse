import { Schema, model, models } from 'mongoose';

const MessageSchema = new Schema(
	{
		sender: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		recipient: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		property: {
			type: Schema.Types.ObjectId,
			ref: 'Property',
			required: true,
		},
		name: {
			type: String,
			required: [true, 'Name is required'],
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
		},
		phone: String,
		body: String,
		isRead: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true, // This will allow 'createdAt' and 'updatedAt' fields to be added
	}
);

const Message = models.Message || model('Message', MessageSchema);

export default Message;
