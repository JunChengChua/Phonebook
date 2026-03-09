// lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;

// // lib/mongodb.ts
// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI!;
// const options = {};

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// if (!global._mongoClientPromise) {
//   client = new MongoClient(uri, options);
//   global._mongoClientPromise = client.connect();
// }

// clientPromise = global._mongoClientPromise;

// export default clientPromise;