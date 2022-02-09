import { readFile } from "fs/promises";

import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/connect.js";
import Job from "./models/Job.js";
import { stat } from "fs";

const start = async () => {
  try {
    connectDB(process.env.MONGO_URL);
    // will wipe all of this collection
    await Job.deleteMany();
    const jsonProducts = JSON.parse(
      await readFile(new URL("./mock-data.json", import.meta.url))
    );
    await Job.create(jsonProducts);
    console.log("Success!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

start();
