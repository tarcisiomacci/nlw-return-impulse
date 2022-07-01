import express from 'express';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e395e067d8070c",
    pass: "e783d676de7f8c"
  }
});

app.post('/feedbacks', async (req, res) => {
  const {type, comment, screenshot} = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type: type,
      comment: comment,
      screenshot: screenshot,
    }
  })

  await transport.sendMail({
    from: 'Equipe fidget <oi@feedget.com>',
    to:  'Tarcisio Macci <tarcisio.maciel.sp@gmail.com>',
    subject: 'Novo feedbac',
    html: [
      `<div style="font-family: sans-serif; font-size:16px; color:#111;">`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `</div>`,
    ].join('\n')
  });

  return res.status(201).json({ data: feedback });
});

app.listen(3333, () => {
  console.log('Sever running and listening on port:3333');
});