// Tiny dependency-free static server for local review. Run: npm start
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 8000;
const DIR = path.join(process.cwd(), "site");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8"
};

const server = http.createServer((req, res) => {
  let filePath = path.join(DIR, req.url === "/" ? "/index.html" : decodeURI(req.url));
  if (!filePath.startsWith(DIR + path.sep) && filePath !== DIR) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  fs.stat(filePath, (err, stat) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    if (stat.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      const ext = path.extname(filePath);
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log("Serving http://localhost:" + PORT + " (Ctrl+C to stop)");
});
