import cors from 'cors';
import dotenv from "dotenv-defaults";
import mongoose from 'mongoose';
import path from "path";

import express from 'express';
import db from './db';
import routes from './routes';

const app = express();

// app.use(cors());
// app.use(express.json());

// db.connect();
// app.use('/api', routes);


// define routes
// app.get("/", (req, res) => {
//     // send the request back to the client
//     console.log("GET /");
//     res.send({ message: "Hello from the server!" }).status(200);
// });

if (process.env.NODE_ENV === "production") {
    console.log("production mode");
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    app.get("/*", function (req, res) {
        res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
    });
}
else {
    console.log("development mode")
}

app.use(cors());
app.use(express.json());
app.use('/api', routes);
db.connect();

// define server
const port = process.env.PORT || 4000;
app.listen(port, () =>
    console.log(`Server is up on port ${port}.`)
);