import { check_valid_reviewer } from "./middlewares/index.js";
import { dologin, doLogout } from "./controllers/index.js";

const authRoutesConfig = (app) => {
  app.post("/login", [check_valid_reviewer, dologin]);
  app.post("/logout", [doLogout]);
  //   app.post("/login", [dologin]);
};
export default authRoutesConfig;
