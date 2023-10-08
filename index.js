const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express = require("express");
const app = express();
const mongoConnection = require("./config/db.config");
const port = process.env.PORT; // setup the server port
const employeeRoutes = require("./routes/employee.route"); // import employee routes

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // parse requrest data content type application/json

// create employee route
app.use("/api/v1/employee", employeeRoutes);
// default root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoConnection(process.env.MONGOOSE_REMOTE_URI)
  .then((result) => {
    // listen to the port
    app.listen(port, () => {
      console.log(`Server is listening at port ${port}`);
    }); 
  })
  .catch((err) => console.log(`DB Connect error : ${err}`));
