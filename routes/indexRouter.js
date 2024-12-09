const { Router } = require("express");
const indexRouter = Router();
const controller = require("../controllers/messagesController");

indexRouter.get("/", controller.getMessages);
indexRouter.get("/populatedb", controller.populatedb);
indexRouter.get("/details/:id", controller.getDetails);
indexRouter.post("/new", controller.CreateMessagePost);
indexRouter.post("/deleteAll", controller.deleteAll);

module.exports = indexRouter;
