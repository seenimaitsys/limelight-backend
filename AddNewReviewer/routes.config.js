import { Check_email_already_excited } from "./middlewares/index.js";
import { doInsertNewReviewer } from "./controllers/index.js";
const CreateReviewerRoutesConfig = (app) => {
  app.post("/create", [Check_email_already_excited, doInsertNewReviewer]);
  // app.post("/create", [doInsertNewReviewer]);
  //   app.post("/login", [loginValidation]);
};
export default CreateReviewerRoutesConfig;
