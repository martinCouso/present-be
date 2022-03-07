import jwt from "jsonwebtoken";
import UserModel from "../Models/Teacher";
import bcrypt from "bcrypt";
import "dotenv/config";
import axios from "axios";

export const getUserFromToken = async (token: string | undefined) => {
  if (!token) {
    return false;
  }
  const authToken = token.split(" ")[1];
  const decodedToken = await jwt.decode(authToken, { complete: true });
  let userId: string | boolean = false;
  if (decodedToken && decodedToken?.payload?.sub) {
    userId = (decodedToken?.payload?.sub as string).split("|")[1];
  }
  return userId;
};

export const getTestUser = async () => {
  let testUser: any;
  testUser = await UserModel.findOne({ email: process.env.TEST_USER_EMAIL });
  if (testUser === null) {
    testUser = {
      email: process.env.TEST_USER_EMAIL,
      firstName: "FirstName",
      lastName: "LastName",
      password: process.env.TEST_USER_PSW,
      courses: [],
    };
    testUser.password = await bcrypt.hash(testUser.password, 10);
    testUser.email_verified = false;
    testUser = new UserModel(testUser);
    testUser = await testUser.save();
  }
  return testUser;
};

export const getTestUserToken = async () => {
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  const data = new URLSearchParams();
  data.append("grant_type", "password");
  data.append("username", process.env.TEST_USER_EMAIL || "");
  data.append("password", process.env.TEST_USER_PSW || "");
  data.append("client_secret", process.env.AUTH0_SECRET || "");
  data.append("client_id", process.env.AUTH0_CLIENT_ID || "");
  data.append("audience", process.env.AUTH0_AUDIENTE || "");
  try {
    const auth0Response = await axios.post(
      process.env.AUTH0_API_AUTH_TOKEN || "",
      data,
      options
    );
    return auth0Response.data.access_token;
  } catch (e) {
    console.log("e", e);
  }
};
