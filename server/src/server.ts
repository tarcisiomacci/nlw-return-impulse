import express from 'express';

const app = express();

app.post('/feedbacks', (req, res) => {
  return res.send('Hello World');
});

app.listen(3333, () => {
  console.log('Sever running and listening on port:3333');
});