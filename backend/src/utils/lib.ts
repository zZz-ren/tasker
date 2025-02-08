import jwt from "jsonwebtoken";

// Generate JWT
export const generateToken = (user: any) => {
  const payload = {
    id: user._id,
    email: user.email,
    avatar: user.avatar,
    name: user.name,
  };
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "7d" });
};
