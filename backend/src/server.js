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
// app.use('/', routes);

// init middleware
if (process.env.NODE_ENV === "development") {
    app.use(cors());
}
// define routes
app.get("/api", (req, res) => {
    // send the request back to the client
    console.log("GET /api");
    res.send({ message: "Hello from the server!" }).status(200);
});

if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    app.get("/*", function (req, res) {
        res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
    });
}

// connect db
db.connect();

// define server
const port = process.env.PORT || 4000;
app.listen(port, () =>
    console.log(`Server is up on port ${port}.`)
);