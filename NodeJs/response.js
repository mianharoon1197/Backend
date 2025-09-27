const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.write(`
    <html>
        <head><title>My First Page</title></head>
        <body><h1>Hello from my Node.js Server!</h1>
        <ol>
        <li>Apple</;> 
        <li>Mango</li> 
        <li>Banana</li> 
        <li>Cherry</li> 
        </ol>
        </body>
    </html>
    `);
  res.end("Hello from Node.js server");
});

server.listen(1197, () => {
  console.log("Server is running at http://localhost:1197");
});
