import mongoose from "mongoose";
import { createServer } from "../config/server";
import supertest from "supertest";
import CourseModel, { CourseInterface } from "../../Models/Course";
import "dotenv/config";
import { coursesList } from "../helpers/mockedData";
import { getTestUser, getTestUserToken } from "../helpers/authHelper";
import { Document } from "mongoose";
/**
 * - find the test user
 * - if the test user doesn't exist we need to create it
 * - log in with the test user and get the token
 * - create 2 courses for the test user
 * - call the courses list endpoint with the test user access token
 * - compare the 2 courses that we created with the response.
 */
let token: string;
const persistedCourses: Array<CourseInterface> = [...coursesList];
beforeEach(async () => {
  const connection = await mongoose.connect(process.env.DB_URI || "default");
  if (connection) {
    const testUser = await getTestUser();
    await CourseModel.deleteMany({ teacherId: testUser._id.toString() });
    const course1: CourseInterface & Document = new CourseModel(
      persistedCourses[0]
    );
    course1.teacherId = testUser.id;
    await course1.save();
    const course2 = new CourseModel(persistedCourses[1]);
    course2.teacherId = testUser.id;
    await course2.save();
    try {
      token = await getTestUserToken();
      persistedCourses[0].teacherId = testUser.id;
      persistedCourses[1].teacherId = testUser.id;
    } catch (e) {
      console.log("e", e);
    }
  } else {
    throw new Error("the connection to the DB has failed");
  }
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

const app = createServer();

test("GET /api/v1/courses Should return a list of courses", async () => {
  await supertest(app)
    .get("/api/v1/courses")
    .set("Authorization", `Bearer ${token}`) // We set the authorization header with the token obtained in the beforeEach hook
    .expect(200)
    .expect("Content-Type", /json/)
    .then((response) => {
      expect(response.body).toMatchObject(persistedCourses);
    });
});

test("POST /api/v1/courses Should return the created Course", async () => {
  await supertest(app)
    .post("/api/v1/courses")
    .set("Authorization", `Bearer ${token}`) // We set the authorization header with the token obtained in the beforeEach hook
    .send(coursesList[0]) // Using `send` is how we send information in the body
    .expect(201) // Since we are creating a resource we expect a 201 status
    .expect("Content-Type", /json/)
    .then((response) => {
      expect(response.body).toMatchObject({
        //We need to check if certain keys and values are equal to the
        course: { ...coursesList[0] },
      });
    });
});
