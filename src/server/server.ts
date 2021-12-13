import * as express from "express";
import * as morgan from "morgan";
import Router from "./routes";
import config from "./config";
import * as passport from 'passport'
import './middleware/bearerstrategy'
import './middleware/localstrategy'

const app = express();

app.use(express.static("public"))

app.use(passport.initialize())

app.use(express.json());
app.use(morgan("dev"));

app.use(Router);

app.use(
  "*",
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => { 
    try {
      if (err) next(err);
      res.status(404).json({ msg: "Requested route not found." });
    } catch (err) {
      next(err);
    }
  }
);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ name: err.name, msg: err.message });
  }
);

app.listen(config.port, () =>
  console.log(`Server Listening on port ${config.port}`)
);
