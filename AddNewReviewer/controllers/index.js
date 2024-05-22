import NewReviewer from "../models/index.js";
export async function doInsertNewReviewer(req, res) {
  const { name, email, mobile, password } = req.body;
  const result = await NewReviewer.createNewReviewer({
    name,
    email,
    mobile,
    password,
  });
  if (result) {
    res.status(200).send({
      code: "009",
      message: result,
      success: true,
      //   calendar: result,
    });
  } else {
    res.status(200).send({
      error: JSON.stringify(result),
      code: "010",

      success: false,
    });
  }
}
