const express = require('express');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');
dotenv.config()
const app = express();

function attach(app,name="first") {
  app.use(cors())
  app.use((req, res, next) => {
    console.log(`${name} got request ${req.method} ${req.url}`);
    next();
  });
  mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => console.log("Successful DB Connection"))
    .catch(err => console.log(err))
  app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
  app.use(bodyParser.json()); // Send JSON responses

  //routes
  app.use('/api/post', require("./routes/forumPostApi"))
  app.use('/user', require("./routes/userApi"));
  app.use('/api/mocktest', require("./routes/mockTestAPI"));

  // default error handler
  const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    res.status(500).json({ error: err });
  }

  app.use(errorHandler);
  return app;
}

const backends = [
  { host: 'localhost', port: 3001, name: "First" },
  { host: 'localhost', port: 3002 , name: "Second"},
];

backends.forEach(backend => {
  const { host, port, name } = backend;
  attach(express(),name).listen(port, () => console.log(`Backend ${name} listening on port ${port}`));
});

const server = express();
server.use((req, res) => {
  const backend = backends.shift();
  backends.push(backend);
  const { host, port } = backend;
  const url = `http://${host}:${port}${req.url}`;
  console.log(`Forwarding request to ${url}`);
  req.pipe(request(url)).pipe(res);
});

server.listen(3000, () => console.log('LoadBalancer Listening on port 3000'));