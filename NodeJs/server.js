const http = require("http");
const fs = require("fs");
const url = require("url");
//req -> sent by client/browser to server
//res -> sent by server to client
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()}: ${req.url} New Request Received\n`;
  const myUrl = url.parse(req.url,true);
  console.log(myUrl);
  fs.appendFile("files/log.txt", log, (err, data) => {
    if (err) {
      console.log("Error: ", err);
      res.end("Response End");
    }
    const username = myUrl.query.myname
    res.end(`Hello ${username} from Node.js server`);
  });
});

server.listen(1197, () => {
  console.log("Server is running at http://localhost:1197");
});
