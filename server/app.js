require("dotenv").config();
const express = require('express')
const connectDb = require('./utils/db');
const router = require("./routers/todo");
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3000

// Body-parser middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// cors 
const corsOption = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
  };
  app.use(cors(corsOption))


// Routers
app.use("/api/todo", router)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// connecting to database
connectDb()
    .then(() => {
        app.listen(port, () => {
            console.log("Server listening on port " + port);
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
    });