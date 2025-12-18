const PriorityStrategy = require("./PriorityStrategy");

class WeightedUrgencyStrategy extends PriorityStrategy {
  constructor(weights = { urgency: 0.5, difficulty: 0.3, workload: 0.2 }) {
    super();
    this.weights = weights;
  }

  clamp01(x) { return Math.max(0, Math.min(1, x)); }

  // normalisasi difficulty 1..5 => 0..1
  normDifficulty(d) { return (d - 1) / 4; }

  // normalisasi workload: estimatedHours diasumsikan wajar 0..10 jam, di-clamp
  normWorkload(h) { return this.clamp01(h / 10); }

  // urgency: makin dekat dueDate makin besar (0..1)
  normUrgency(dueDate) {
    const today = new Date();
    const due = new Date(dueDate + "T00:00:00");
    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    // <=0 hari => 1, >=14 hari => mendekati 0
    const u = 1 - this.clamp01(diffDays / 14);
    return this.clamp01(u);
  }

  async computePriority(task, sessions) {
    const u = this.normUrgency(task.dueDate);
    const d = this.normDifficulty(task.difficulty);
    const w = this.normWorkload(task.estimatedHours);

    const score =
      this.weights.urgency * u +
      this.weights.difficulty * d +
      this.weights.workload * w;

    return Number(this.clamp01(score).toFixed(4));
  }
}

module.exports = WeightedUrgencyStrategy;
