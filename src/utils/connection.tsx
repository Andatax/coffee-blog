import mongoose from "mongoose";
declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

try {
    await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });
    cached.conn = mongoose.connection;
} catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
}

export default  cached.conn;
