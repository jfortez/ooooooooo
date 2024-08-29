import http from "http";
import mysql from "mysql2/promise";
const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/user") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    res.end(JSON.stringify({ name: "John", age: 30 }));
    return;
  }
  if (req.method === "GET" && req.url === "/db") {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || "localhost",
      user: "root",
      password: "root",
      database: "test",
    });
    const result = await connection.query("SELECT 2+2 AS result");
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(result));
    return;
  }
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
