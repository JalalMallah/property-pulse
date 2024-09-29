import mongoose from 'mongoose';

let isConnected = false;

// All of mongoose methods are async
const connectDB = async () => {
	mongoose.set('strictQuery', true);

	// If the database is already connected, don't connect again
	if (isConnected) {
		console.log('MongoDB is connected');
		return;
	}

	// Connect to MongoDB
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		isConnected = true;
	} catch (error) {
		console.error(error);
	}
};

export default connectDB;
