import { Router } from "express";
import authRoute from "./auth.route";
import postRoute from "./post.route";
import imageRoute from "./image.route";

const apiRouter = Router();

apiRouter.use("/auth", authRoute);
apiRouter.use("/post", postRoute);
apiRouter.use("/image", imageRoute);

export default apiRouter;
