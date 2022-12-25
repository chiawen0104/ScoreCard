import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";
const app = express();
const port = process.env.PORT || 4000;

dotenv.config();
mongoose
    .connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((res) => console.log("mongo db connection created"));

// Parses the text as JSON and exposes the resulting
// object on req.body.
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`),
);

app.get('/', (req, res) => {
    res.send('Received a GET HTTP method');
});
app.post('/', (req, res) => {
    res.send('Received a POST HTTP method');
});
  app.put('/', (req, res) => {
    res.send('Received a PUT HTTP method');
});
  app.delete('/', (req, res) => {
    res.send('Received a DELETE HTTP method');
});

app.post('/users', (req, res) => {
    res.send('POST HTTP method on users resource');
});
app.put('/users/:userId', (req, res) => {
    res.send(
      `PUT HTTP method on users/${req.params.userId} resource`,
    );
});