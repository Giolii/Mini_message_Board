const db = require("../db/queries");

async function getMessages(req, res) {
  const messages = await db.getAllMessages();
  res.render("index", { messages: messages });
}

async function getDetails(req, res) {
  const messages = await db.getAllMessages();
  res.render("details", { messages: messages, id: req.params.id });
}

async function CreateMessagePost(req, res) {
  const message = req.body;
  await db.insertMessage(message);
  res.redirect("/");
}

async function deleteAll(req, res) {
  const { message } = req.body;
  await db.deleteAll();
  res.redirect("/");
}

module.exports = {
  getMessages,
  CreateMessagePost,
  getDetails,
  deleteAll,
};
