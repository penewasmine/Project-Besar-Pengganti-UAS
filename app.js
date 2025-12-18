const express = require("express");
const path = require("path");
const morgan = require("morgan");
const methodOverride = require("method-override");

const db = require("./models");
const TaskService = require("./services/TaskService");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

(async () => {
  await db.sequelize.sync();
  const service = new TaskService(db);

  app.get("/", (req, res) => res.render("index", { title: "Dashboard" }));

  app.use("/tasks", require("./routes/tasks")(service));
  app.use("/sessions", require("./routes/sessions")(service));
  app.use("/prioritas", require("./routes/prioritas")(service));

  app.listen(PORT, () => console.log(`Running: http://localhost:${PORT}`));
})();
