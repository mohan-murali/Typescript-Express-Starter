import { Request, Response, Router } from "express";
import { authHandler } from "../middleware/authHandler";

const router = Router();

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

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

router.post("/login", (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (email && password) {
    //Check if the email and password is correct
    // mark the person as logged in
    req.session = { loggedIn: true };

    //redirect them to root router
    res.redirect("/");

    //if not correct then send error response
    // res.send({
    //   status: "error",
    //   message: "Email or password supplied is not correct",
    // });
  } else
    res.send({
      status: "error",
      message: "You need to send email and password",
    });
});

export { router };
