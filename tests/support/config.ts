import dotenv from "dotenv";

dotenv.config();

if (!process.env.BASE_URL) {
  throw new Error("BASE_URL is not defined. Check your .env file");
}

export const config = {
  baseUrl: process.env.BASE_URL!,
  user: {
    email: process.env.USER_EMAIL!,
    password: process.env.USER_PASSWORD!
  }
};
