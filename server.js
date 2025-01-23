const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Устанавливаем заголовки для Gzip-файлов
app.get("*.js.gz", (req, res, next) => {
    res.set("Content-Encoding", "gzip");
    res.set("Content-Type", "application/javascript");
    next();
});

app.get("*.wasm.gz", (req, res, next) => {
    res.set("Content-Encoding", "gzip");
    res.set("Content-Type", "application/wasm");
    next();
});

app.use(express.static(path.join(__dirname, "Build")));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
