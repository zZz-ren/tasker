import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import session from "express-session";
import dotenv from "dotenv";
import http from "http";
import cookie from "cookie-parser";
import { Server } from "socket.io";
import passport from "./passport";
import cors from "cors";
import { defaultRouter } from "../routes";
import path from "path";

dotenv.config();

const app = express();
const FRONTEND_PATH = path.join(__dirname, "../../../frontend/dist");

app.use(
  cors({
    origin: "/",
    credentials: true,
  })
);

app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET || "optional_secret_key_123abc456def789ghi",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60, // 1 month
      secure: process.env.NODE_ENV === "production" ? true : "auto",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

app.use(cookie());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(FRONTEND_PATH));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// app.use("/",);
app.use("/api", defaultRouter);
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({ status: false, message: "Route not found" });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.MODE == "development" ? "http://localhost:5173/" : "/",
    credentials: true,
  },
});

export { io, server, app };
