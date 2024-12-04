const { Router } = require("express");
const indexRouter = Router();
const newRouter = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
  {
    text: "Wazzup broother!",
    user: "Gil",
    added: new Date(),
  },
];

indexRouter.get("/", (req, res) => res.render("index", { messages: messages }));
indexRouter.get("/details/:id", (req, res) =>
  res.render("details", { messages: messages, id: req.params.id })
);
indexRouter.get("/new", (req, res) => res.render("form"));
indexRouter.post("/new", (req, res) => {
  messages.push({
    text: req.body.text,
    user: req.body.name,
    added: new Date(),
  });
  res.redirect("/");
});

module.exports = indexRouter;
