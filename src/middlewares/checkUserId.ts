import { getUserFromToken } from "../helpers/authHelper";
import { Request, Response } from "express";

/**
 * This is a middleware, a function that can be chained over the life of a request
 * this function in particular checks if the request contains a valid user id in the
 * authorization header, in case that the userId can be extracted is attached to the response
 * object under the `locals` property for easy access in the following middlewares otherwise
 * a response pointing that the client is unauthorized is sent and the cycle stops there, meaning
 * that others middlewares won't be called (this is accomplished by not invoking the `next` function.
 * @param request: express.Request
 * @param response: express.Response
 * @param next
 */
export const checkUserId = async (
  request: Request,
  response: Response,
  next: () => void
) => {
  const userId = await getUserFromToken(request.headers?.authorization);
  if (!userId) {
    response.status(401).json({ error: "Necesitas iniciar sesión primero" });
  } else {
    response.locals.userId = userId;
    next();
  }
};
