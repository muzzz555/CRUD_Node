const express = require("express");
const app = express();
const userRoute = require('./routes/user')
require("dotenv").config();

const port = process.env.PORT_SERVER;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api',userRoute)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
