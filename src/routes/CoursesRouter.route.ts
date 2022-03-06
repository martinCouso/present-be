import { Router } from "express";
import CoursesController from "../controllers/CoursesController";
import { checkSchema } from "express-validator";
import {
  CreateCourseValidation,
  UpdateCourseValidation,
} from "../validation-schemas/CourseValidationScheme";

const CoursesRouter = Router();

CoursesRouter.get("/", CoursesController.list);
CoursesRouter.post(
  "/",
  checkSchema(CreateCourseValidation),
  CoursesController.create
);
CoursesRouter.patch(
  "/ :courseId",
  checkSchema(UpdateCourseValidation),
  CoursesController.update
);

export default CoursesRouter;
