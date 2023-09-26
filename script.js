const http = require("http");
const url = require("url");

const endpoints = ["/profile", "/products", "/cart", "/register", "/login"];
const products = ["milk", "eggs", "cheese", "pork", "shrimp", "chicken"];

http
  .createServer((req, resp) => {
    resp.writeHead(200, { "Content-Type": "text/html" });
    let path = url.parse(req.url).pathname;
    let qry = url.parse(req.url, true).query;
    let respText = "";

    if (endpoints.includes(path)) {
      if (path == "/products" && qry.search !== undefined) {
        respText = products.includes(qry.search)
          ? `<h2>Product ${qry.search} found!</h2>`
          : `<h2>Product ${qry.search} NOT found!</h2>`;
      } else {
        respText = `<h2>This is the ${path} page!</h2>`;
      }
    } else {
      respText = "<h2>This page is not found!</h2>";
    }

    resp.write(respText);
    resp.end();
  })
  .listen(8080);
