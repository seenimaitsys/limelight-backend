import { verifyToken } from "../common/middlewares/index.js";
import { getUniqeVideo, updateVideoReviewed } from "./controllers/index.js";
const GetUniqeVideoRoutesConfig = (app) => {
  app.post("/getvideo", [verifyToken, getUniqeVideo]);
  app.post("/updatevideoreview", [verifyToken, updateVideoReviewed]);
};
export default GetUniqeVideoRoutesConfig;
