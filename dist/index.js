"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mailer_1 = require("./mailer");
dotenv_1.default.config();
const app = express_1.default();
const port = process.env.PORT || 8080; // default port to listen
const mailer = new mailer_1.Mailer();
// Configure Express to use EJS
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
// define a route handler for the default home page
app.get("/", (_, res) => {
    res.render("index");
});
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (!data.to || !data.subject || !data.from) {
        res.status(400).json("Missing 'to' or 'subject' or 'from' parameter");
    }
    else {
        const info = yield mailer.send(data);
        res.status(200).json(info);
    }
}));
// start the express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map