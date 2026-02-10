import jwt from "jsonwebtoken";

const createAuthMiddleware = (roles = ["user"]) => {
  return (req, res, next) => {

    // ✅ safer token extraction
    const authHeader = req.headers.authorization;

    const token =
      req.cookies?.token ||
      (authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null);

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: No token provided",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ role check
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({
          message: "Forbidden: Insufficient permissions",
        });
      }

      req.user = decoded;
      next();

    } catch (error) {

      // ⭐ Better error messaging
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Unauthorized: Token expired",
        });
      }

      return res.status(401).json({
        message: "Unauthorized: Invalid token",
      });
    }
  };
};

export default createAuthMiddleware;
