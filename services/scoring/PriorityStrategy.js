class PriorityStrategy {
  // Polymorphism: tiap turunan wajib override
  async computePriority(task, sessions) {
    throw new Error("computePriority() must be implemented by subclasses");
  }
}
module.exports = PriorityStrategy;
