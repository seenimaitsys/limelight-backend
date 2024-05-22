import jwt from "jsonwebtoken";
export const dologin = (req, res) => {
  try {
    if (req.currentlogin) {
      const token = jwt.sign({ id: req.id }, process.env.JWT_SECRET);
      const { password: pass, createdAt: created, ...rest } = req.currentlogin;

      const mergedObject = { id: req.id, ...rest };
      res
        .cookie("access_token", token, {
          httpOnly: true,
        }) //no limite time we need set time
        .status(200)
        .json(mergedObject);
    } else {
      res.status(200).send({
        message: "some network error try again",
        success: false,
        loading: false,
      });
    }
  } catch (error) {
    res.status(200).send({
      message: error,
      success: false,
      loading: false,
    });
  }
};
export const doLogout = (req, res) => {
  try {
    res.clearCookie("access_token");
    res.status(200).send({ message: "Logged out successfully" });
  } catch (error) {
    res.status(200).json(error.message);
  }
};
