import mongoose from "mongoose";
import {createServer} from "../config/server";
import supertest from "supertest";

beforeEach((done) => {
    mongoose.connect(process.env.DB_URI || 'default',
        () => done()
    )
})

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
    })
})

const app = createServer()

test("GET / Should respond with a Json object {message:ok}", async () => {

    await supertest(app)
        .get("/")
        .expect(200)
        .expect('Content-Type', /json/)
        .then((response) => {
            expect(response.body).toMatchObject({'message': 'ok'})
        })
})
