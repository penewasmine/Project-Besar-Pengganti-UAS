const PriorityStrategy = require("./PriorityStrategy");

// Menambahkan boost jika tren durasi belajar (moving average) naik
class TrendBoostStrategy extends PriorityStrategy {
  constructor(baseStrategy, windowSize = 3, boost = 0.08) {
    super();
    this.baseStrategy = baseStrategy; // komposisi + polymorphism
    this.windowSize = windowSize;
    this.boost = boost;
  }

  clamp01(x) { return Math.max(0, Math.min(1, x)); }

  movingAverage(arr, w) {
    if (arr.length < w) return null;
    const res = [];
    for (let i = 0; i <= arr.length - w; i++) {
      const slice = arr.slice(i, i + w);
      res.push(slice.reduce((a, b) => a + b, 0) / w);
    }
    return res;
  }

  async computePriority(task, sessions) {
    let base = await this.baseStrategy.computePriority(task, sessions);

    // data sesi: menit belajar per sesi (urut by createdAt biasanya sudah dari DB)
    const mins = sessions.map(s => s.minutes);
    const ma = this.movingAverage(mins, this.windowSize);

    if (ma && ma.length >= 2) {
      const trend = ma[ma.length - 1] - ma[0];
      if (trend > 0) base += this.boost;
    }

    return Number(this.clamp01(base).toFixed(4));
  }
}

module.exports = TrendBoostStrategy;
