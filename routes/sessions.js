const express = require("express");
const router = express.Router();

module.exports = (service) => {
  router.get("/:taskId", async (req, res) => {
    const task = await service.getTask(req.params.taskId);
    const sessions = await service.listSessions(req.params.taskId);
    res.render("sessions/list", { title: "Sesi Belajar", task, sessions });
  });

  router.post("/:taskId", async (req, res) => {
    await service.addSession(req.params.taskId, {
      minutes: Number(req.body.minutes),
      note: req.body.note || null
    });
    res.redirect(`/sessions/${req.params.taskId}`);
  });

  return router;
};
