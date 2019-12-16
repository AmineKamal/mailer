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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const json_beautify_1 = __importDefault(require("json-beautify"));
const NodeMailer = __importStar(require("nodemailer"));
const TO_DELETE = ["to", "subject", "from"];
class Mailer {
    constructor() {
        this.transporter = NodeMailer.createTransport({
            host: process.env.HOST,
            port: 465,
            secure: true,
            auth: {
                user: this.user.user,
                pass: this.user.pass // generated ethereal password
            }
        });
    }
    get user() {
        return { user: process.env.USER, pass: process.env.PASS };
    }
    send(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { from, to, subject } = data;
            const info = yield this.transporter.sendMail({
                from,
                to,
                subject,
                text: json_beautify_1.default(this.extract(data), null, 4, 100)
            });
            return info;
        });
    }
    extract(data) {
        TO_DELETE.forEach(key => delete data[key]);
        return data;
    }
}
exports.Mailer = Mailer;
//# sourceMappingURL=mailer.js.map