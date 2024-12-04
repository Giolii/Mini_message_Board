const express = require("express");
const app = express();
const path = require("node:path");
const PORT = process.env.PORT || 3000;

const indexRouter = require("./routes/indexRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(port, () => {
  console.log("Listening on port ", port);
});
