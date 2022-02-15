import Sequelize from "sequelize";

// .env ES6 load fix - find better solution
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: `${__dirname}/../.env` });
console.log(process.env.NODE_ENV);
// end fix

const env = process.env.NODE_ENV || "development";
// parsing JSON config data - ES6 unable to directly import JSON yet.
import { readFile } from "fs/promises";
const json = JSON.parse(
  await readFile(new URL("../config/config.json", import.meta.url))
);

const config = json[env];

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: "localhost",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    logging: false,
  }
);

export default sequelize;
