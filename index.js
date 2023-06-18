const express = require('express');
const cors = require('cors');
const db = require('./db/db');
const routes = require('./routes/routes');

require("./middlewares/auth")

const app = express();

db();

app.use(express.json());
app.use(cors()); // Enable CORS
app.use(routes);
app.listen(8080, () => console.log("Server is running on port 8080"));
