import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authHandler } from "../middleware/authHandler";
import { User, UserModel } from "../models/user";
import * as dotenv from "dotenv";

dotenv.config();

const router = Router();
const JWT_KEY = process.env.JWT_KEY || "";
console.log("the jwt secret is", JWT_KEY);

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */
router.get("/", (req: Request, res: Response) => {
  if (req.session?.loggedIn) {
    res.send("you are logged In");
  } else {
    res.send("you are not logged In");
  }
});

router.get("/logout", (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect("/");
});

router.get("/protected", authHandler, (req: Request, res: Response) => {
  res.send("welcome to the protected route");
});

router.get("/login", (req: Request, res: Response) => {
  res.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email" />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" />
      </div>
      <button>Submit</button>
    </form>
  `);
});

router.get("/signUp", (req: Request, res: Response) => {
  res.send(`
    <form method="POST">
      <div>
        <label>Name</label>
        <input name="name" />
      </div>
      <div>
        <label>Email</label>
        <input name="email" />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" />
      </div>
      <button>Submit</button>
    </form>
  `);
});

router.post("/signUp", async (req: RequestWithBody, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (name && email && password) {
      //Check if the email and password is correct
      const user: User = {
        name,
        email,
        password,
      };

      let userCheck = await UserModel.findOne({ email: email });
      if (userCheck) {
        res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }

      let newUser = new UserModel(user);
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(newUser.password, salt);
      newUser = await newUser.save();

      res.status(200).json({
        success: true,
        message: "user created successfully",
      });
    } else
      res.status(400).json({
        success: false,
        message: "You need to send name, email and password",
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "cannot retrieve user",
    });
  }
});

/**
 * @swagger
 * /login:
 *  post:
 *    summary: Validate and login user
 *    responses:
 *      200:
 *        description: Ok
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                token:
 *                  type: string
 *                user:
 *                  type: object
 *                  properties:
 *                    id:
 *                     type: integer
 */
router.post("/login", async (req: RequestWithBody, res: Response) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      //Check if the email and password is correct
      const user = await UserModel.findOne({ email: email });

      if (user) {
        const passwordMatched = await bcrypt.compare(
          password as string,
          user.password
        );
        if (passwordMatched) {
          const token = jwt.sign({ userId: user._id }, JWT_KEY, {
            expiresIn: "24h",
          });

          return res.status(200).json({
            success: true,
            user,
            token,
          });
        } else {
          return res.status(403).json({
            success: false,
            message: "email and password did not match",
          });
        }
      }
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    } else
      res.status(400).json({
        success: false,
        message: "You need to send email and password",
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "cannot retrieve user",
    });
  }
});

export { router };
