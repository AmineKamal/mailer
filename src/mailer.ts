import stringify from "json-beautify";
import * as NodeMailer from "nodemailer";
import { IMailerData } from "./interfaces";

const TO_DELETE = ["to", "subject", "from"];

export class Mailer {
  private transporter: NodeMailer.Transporter;

  public constructor() {
    this.transporter = NodeMailer.createTransport({
      host: process.env.APP_MAILER_HOST,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: this.user.user, // generated ethereal user
        pass: this.user.pass // generated ethereal password
      }
    });
  }

  private get user() {
    return {
      user: process.env.APP_MAILER_USERNAME,
      pass: process.env.APP_MAILER_PASS
    };
  }

  public async send(data: IMailerData) {
    const { from, to, subject } = data;
    let info;

    try {
      info = await this.transporter.sendMail({
        from,
        to,
        subject,
        text: stringify(this.extract(data), null, 4, 100)
      });
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
    }

    return info;
  }

  private extract(data: IMailerData) {
    TO_DELETE.forEach(key => delete data[key]);
    return data;
  }
}
