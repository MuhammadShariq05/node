const http = require("http");
const fs = require("fs");
const url = require("url");

function myHandler(req, res) {
  const log = `${Date.now()}: ${req.method}: ${req.url} New request\n`;
  const myUrl = url.parse(req.url, true);
  if (myUrl.pathname === "/favicon.ico") {
    return res.end();
  }
  console.log(myUrl);
  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        res.end("Home page");
        break;
      case "/about":
        const username = myUrl.query.myname;
        res.end(`Hi, My name is ${username}`);
        break;
      default:
        res.end("404 Result not found");
        break;
    }
  });
}

const server = http.createServer(myHandler);

server.listen(8000, () => console.log("Server Started"));
