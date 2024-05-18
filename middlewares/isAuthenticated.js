import verifyToken from "../utils/verifyToken.js";

const isAuthenticated = (model) => {
  return async (req, res, next) => {
    // Get token from header
    // Don't forget to use the headers section in POSTMAN!
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(" ")[1];
    // The above means -> const token = headerObj && headerObj.authorization && headerObj.authorization.split(" ")[1];

    // If no token, return an error
    if (!token) {
      return next(new Error("No token provided"));
    }
    // Verify token
    const verifiedToken = await verifyToken(token);
    if (verifiedToken && !verifiedToken.msg) {
      const user = await model.findById(verifiedToken.id);
      if (!user) {
        const err = new Error("User not found");
        next(err);
      } else {
        // Save the user into req.obj
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
