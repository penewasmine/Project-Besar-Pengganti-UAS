const fs = require("fs/promises");
const path = require("path");
const WeightedUrgencyStrategy = require("./scoring/WeightedUrgencyStrategy");
const TrendBoostStrategy = require("./scoring/TrendBoostStrategy");

class TaskService {
  constructor(db) {
    this.db = db;

    const base = new WeightedUrgencyStrategy({ urgency: 0.55, difficulty: 0.25, workload: 0.20 });

    this.strategies = {
      weighted: base,
      trend: new TrendBoostStrategy(base, 3, 0.08)
    };
  }

  async listTasks() {
    return this.db.Task.findAll({ order: [["id", "DESC"]] });
  }

  async getTask(id) {
    return this.db.Task.findByPk(id);
  }

  async createTask(payload) {
    return this.db.Task.create(payload);
  }

  async updateTask(id, payload) {
    const t = await this.db.Task.findByPk(id);
    if (!t) throw new Error("Task not found");
    return t.update(payload);
  }

  async deleteTask(id) {
    const t = await this.db.Task.findByPk(id);
    if (!t) throw new Error("Task not found");
    await t.destroy();
    return true;
  }

  async addSession(taskId, payload) {
    const t = await this.db.Task.findByPk(taskId);
    if (!t) throw new Error("Task not found");
    return this.db.Session.create({ ...payload, taskId });
  }

  async listSessions(taskId) {
    return this.db.Session.findAll({
      where: { taskId },
      order: [["id", "ASC"]]
    });
  }

  async getPrioritized(strategyKey = "trend") {
    const strategy = this.strategies[strategyKey] || this.strategies.trend;

    const tasks = await this.db.Task.findAll({
      include: [{ model: this.db.Session }]
    });

    const scored = [];
    for (const t of tasks) {
      const sessions = t.Sessions || [];
      const priority = await strategy.computePriority(t, sessions);
      const totalMinutes = sessions.reduce((a, s) => a + s.minutes, 0);

      scored.push({
        task: t,
        priority,
        sessionsCount: sessions.length,
        totalMinutes
      });
    }

    scored.sort((a, b) => b.priority - a.priority);
    return scored;
  }

  // FILE CRUD: export prioritas ke JSON
  async exportPrioritized(strategyKey = "trend") {
    const items = await this.getPrioritized(strategyKey);

    const exportDir = path.join(process.cwd(), "data", "exports");
    await fs.mkdir(exportDir, { recursive: true });

    const filename = `prioritas_${strategyKey}_${Date.now()}.json`;
    const fullpath = path.join(exportDir, filename);

    const payload = items.map(x => ({
      id: x.task.id,
      title: x.task.title,
      course: x.task.course,
      dueDate: x.task.dueDate,
      estimatedHours: x.task.estimatedHours,
      difficulty: x.task.difficulty,
      priority: x.priority,
      sessionsCount: x.sessionsCount,
      totalMinutes: x.totalMinutes
    }));

    await fs.writeFile(fullpath, JSON.stringify(payload, null, 2), "utf-8");
    return { filename, fullpath, count: payload.length };
  }

  // FILE CRUD: baca file export (contoh read)
  async readExport(filename) {
    const fullpath = path.join(process.cwd(), "data", "exports", filename);
    const content = await fs.readFile(fullpath, "utf-8");
    return JSON.parse(content);
  }
}

module.exports = TaskService;
