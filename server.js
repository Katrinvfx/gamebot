const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Указываем, что index.html лежит в корне проекта
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Указываем папку со статическими файлами Unity WebGL
app.use("/Build", express.static(path.join(__dirname, "Build")));

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

