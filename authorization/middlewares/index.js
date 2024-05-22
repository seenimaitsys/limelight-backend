import { checkLoginCredentials } from "../models/index.js";
export const check_valid_reviewer = async (req, res, next) => {
  const { email, password } = req.body;

  const result = await checkLoginCredentials({ email, password });
  if (result.currentlogin) {
    req.currentlogin = result.currentlogin;
    req.id = result.id;
    next();
  } else {
    res.status(200).send({
      error: JSON.stringify(result),
      message: result.message,
      success: false,
    });
  }
};
