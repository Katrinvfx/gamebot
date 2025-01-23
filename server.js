const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Разрешаем CORS (на случай использования Telegram WebApp)
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Обслуживаем index.html из корневой папки
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Обслуживаем сжатые файлы Unity WebGL из папки Build
app.use("/Build", express.static(path.join(__dirname, "Build"), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith(".gz")) {
            if (filePath.endsWith(".wasm.gz")) {
                res.setHeader("Content-Encoding", "gzip");
                res.setHeader("Content-Type", "application/wasm");
            } else if (filePath.endsWith(".js.gz")) {
                res.setHeader("Content-Encoding", "gzip");
                res.setHeader("Content-Type", "application/javascript");
            } else if (filePath.endsWith(".data.gz")) {
                res.setHeader("Content-Encoding", "gzip");
                res.setHeader("Content-Type", "application/octet-stream");
            }
        }
    }
}));

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
