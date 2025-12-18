const express = require("express");
const router = express.Router();

module.exports = (service) => {
  router.get("/", async (req, res) => {
    const strategy = req.query.strategy || "trend";
    const items = await service.getPrioritized(strategy);
    res.render("prioritas/index", { title: "Prioritas", items, strategy, exported: req.query.exported || null });
  });

  router.post("/export", async (req, res) => {
    const strategy = req.body.strategy || "trend";
    const info = await service.exportPrioritized(strategy);
    res.redirect(`/prioritas?strategy=${strategy}&exported=${encodeURIComponent(info.filename)}`);
  });

  return router;
};
