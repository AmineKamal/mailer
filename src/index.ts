import dotenv from "dotenv";
import express from "express";
import path from "path";
import { IMailerData } from "./interfaces";
import { Mailer } from "./mailer";

dotenv.config();

const app = express();
const port = parseFloat(process.env.PORT) || 8080; // default port to listen
const mailer = new Mailer();

// Configure Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded());

// define a route handler for the default home page
app.get("/", (_, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
  const data: IMailerData = req.body;

  if (!data.to || !data.subject || !data.from) {
    res.status(400).json("Missing 'to' or 'subject' or 'from' parameter");
  } else {
    const info = await mailer.send(data);
    res.status(200).json(info);
  }
});

// start the express server
app.listen(port, "0.0.0.0", () => {
  // tslint:disable-next-line:no-console
  console.log(`Server started at http://localhost:${port}`);
});
