const jsonServer = require("json-server");
const server = jsonServer.create();
const todoRouter = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);

server.put("/items/:id/completion", (req, res) => {
    const db = todoRouter.db;
    const id = parseInt(req.params["id"]);

    const editedItem = db.get("items").find({ id });

    if (!editedItem) {
        return res.sendStatus(404);
    }

    const currentlyCompleted = editedItem.value().isDone;
    editedItem.assign({ isDone: !currentlyCompleted, finishedAt: currentlyCompleted ? undefined : Date.now() }).write();

    return res.sendStatus(204);
});

server.use((req, res, next) => {
    if (req.method === "POST") {
        req.body.createdAt = Date.now();
        req.body.isDone = false;
    }
    next();
});

server.use(todoRouter);

// Use default router
server.listen(3000, () => {
    console.log("JSON Server is running");
});
