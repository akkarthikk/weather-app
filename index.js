import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send(`
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
        <br>
        <br>
        <br>
        <center><h5>Hello!</h5></center>
        </body>
    `);
});

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});