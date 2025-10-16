import mongoose from 'mongoose';

export default async function connectDB() {
  try {
    // Local MongoDB connection URI
    const uri = 'mongodb://127.0.0.1:27017/TestDB'; // change 'testdb' to your DB name

    // Mongoose connection
    await mongoose.connect(uri);

    console.log('✅ Connected to MongoDB at ' + uri);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // Exit the app if connection fails
  }
}