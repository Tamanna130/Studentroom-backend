const express = require('express');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
dotenv.config()
const app = express();
app.use(cors())

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Successful DB Connection"))
.catch(err => console.log(err))

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses

//routes
app.use(require("./routes/forumPostApi"))
app.use(require("./routes/userApi"));

// default error handler
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    res.status(500).json({ error: err });
  }
  
  app.use(errorHandler);

app.listen(process.env.PORT, () =>{
    console.log('listening on port 3000');
});