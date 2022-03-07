import { createServer } from "../config/server";
import supertest from "supertest";

const app = createServer();

test("GET / Should respond with a Json object {message:ok}", async () => {
  await supertest(app)
    .get("/")
    .expect(200)
    .expect("Content-Type", /json/)
    .then((response) => {
      expect(response.body).toMatchObject({ message: "ok" });
    });
});
