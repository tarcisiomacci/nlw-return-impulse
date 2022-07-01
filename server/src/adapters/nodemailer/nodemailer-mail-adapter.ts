import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e395e067d8070c",
    pass: "e783d676de7f8c"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: 'Equipe fidget <oi@feedget.com>',
      to:  'Tarcisio Macci <tarcisio.maciel.sp@gmail.com>',
      subject,
      html: body,
    });
  }
}