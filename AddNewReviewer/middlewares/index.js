import NewReviewer from "../models/index.js";
export const Check_email_already_excited = async (req, res, next) => {
  const { email } = req.body;
  const result = await NewReviewer.findEmail_For_already_excited(email);
  if (result) {
    // res.status(200).send({
    //   code: "009",
    //   message: result,
    //   success: true,
    // });
    next();
  } else {
    res.status(200).send({
      error: JSON.stringify(result),

      message: "user exits",
      success: false,
    });
  }
};
