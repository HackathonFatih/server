import verifyToken from "../utils/verifyToken.js";

const isAuthenticated = (model) => {
  return async (req, res, next) => {
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(" ")[1];

    if (!token) {
      return next(new Error("No token provided"));
    }

    const verifiedToken = await verifyToken(token);

    if (verifiedToken && !verifiedToken.msg) {
      const user = await model.findById(verifiedToken.id);

      if (!user) {
        const err = new Error("User not found");
        next(err);
      } else {
        req.userAuth = user;
        next();
      }
    } else {
      const err = new Error("Token expired/invalid");
      next(err);
    }
  };
};

export default isAuthenticated;
