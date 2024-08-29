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
    const access = {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT,
    };
    const connection = await mysql.createConnection(access);
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
