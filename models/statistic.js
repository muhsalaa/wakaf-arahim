const { Schema, model, models } = require("mongoose");

const StatisticSchema = new Schema(
  {
    total_paid: { type: Number, default: 0 },
    total_muwaqif: [{ type: String }],
    total_wide: { type: Number },
  },
  { timestamps: true }
);

// 'name of model', 'schema', 'collection name'
module.exports = models.Statistic || model("Statistic", StatisticSchema);
