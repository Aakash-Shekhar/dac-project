require('dotenv').config();
const express = require('express');
const app = express();



app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log("Error while conencting with server",err);
    }
    console.log("Server is running on port", process.env.PORT);
})