import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token)
    return res.status(200).send({
      message: "not valied tooken!",
      logout: true,
      loading: false,
      success: false,
    });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(200).send({
        message: "not valied tooken!",
        success: false,
        logout: true,
      });
    next();
  });
};
