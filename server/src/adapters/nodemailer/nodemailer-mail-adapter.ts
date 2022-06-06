import { MailAdapter, SendEmailData } from "../mail-adapteres";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b7c2b85504b34d",
      pass: "347dae40d1d230"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail ({ subject, body }: SendEmailData) {
     await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Matheus <email@feedget.com>', // trocar pelo email de producao
        subject,
        html :body 
        }) 
    };
}