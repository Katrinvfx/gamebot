const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Разрешаем CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Обслуживаем index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Обслуживаем статические файлы из папки Build с правильными заголовками
app.use("/Build", express.static(path.join(__dirname, "Build"), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith(".wasm")) {
            res.setHeader("Content-Type", "application/wasm");
        }
        if (filePath.endsWith(".js")) {
            res.setHeader("Content-Type", "application/javascript");
        }
        if (filePath.endsWith(".data")) {
            res.setHeader("Content-Type", "application/octet-stream");
        }
    }
}));

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
