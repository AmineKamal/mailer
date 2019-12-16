export interface IMailerData {
  to: string;
  subject: string;
  from: string;
  [key: string]: string;
}
