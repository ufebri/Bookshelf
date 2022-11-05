const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.setHeader("X-Powered-By", "NodeJS");

  const { method, url } = request;

  if (url == "/") {
    if (method == "GET") {
      response.statusCode = 200;
      response.end(
        JSON.stringify({
          message: "Cool, this is a HomePage",
        })
      );
    } else {
      response.statusCode = 400;
      response.end(
        JSON.stringify({
          message: `Umm seems like theres no ${method} request here`,
        })
      );
    }
  } else if (url == "/about") {
    if (method == "GET") {
      response.statusCode = 200;
      response.end(
        JSON.stringify({
          message: "Yello!, iyep this is about page",
        })
      );
    } else if (method == "POST") {
      let body = [];

      request.on("data", (chunk) => {
        body.push(chunk);
      });

      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.statusCode = 200;
        response.end(
          JSON.stringify({
            message: `Yello, ${name}!, Welcome to about page!`,
          })
        );
      });
    } else {
      response.statusCode = 400;
      response.end(
        JSON.stringify({
          message: `Umm seems like theres no ${method} request here`,
        })
      );
    }
  } else {
    response.statusCode = 404;
    response.end(
      JSON.stringify({
        message: "Page Not Found",
      })
    );
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server litterally work on http://${host}:${port}`);
});
