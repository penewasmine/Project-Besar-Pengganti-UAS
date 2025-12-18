const express = require("express");
const router = express.Router();

module.exports = (service) => {
  router.get("/", async (req, res) => {
    const tasks = await service.listTasks();
    res.render("tasks/list", { title: "Tugas", tasks });
  });

  router.get("/new", (req, res) => {
    res.render("tasks/form", { title: "Tambah Tugas", task: null });
  });

  router.post("/", async (req, res) => {
    await service.createTask({
      title: req.body.title,
      course: req.body.course,
      dueDate: req.body.dueDate,
      estimatedHours: Number(req.body.estimatedHours),
      difficulty: Number(req.body.difficulty)
    });
    res.redirect("/tasks");
  });

  router.get("/:id/edit", async (req, res) => {
    const task = await service.getTask(req.params.id);
    res.render("tasks/form", { title: "Edit Tugas", task });
  });

  router.put("/:id", async (req, res) => {
    await service.updateTask(req.params.id, {
      title: req.body.title,
      course: req.body.course,
      dueDate: req.body.dueDate,
      estimatedHours: Number(req.body.estimatedHours),
      difficulty: Number(req.body.difficulty)
    });
    res.redirect("/tasks");
  });

  router.delete("/:id", async (req, res) => {
    await service.deleteTask(req.params.id);
    res.redirect("/tasks");
  });

  return router;
};
