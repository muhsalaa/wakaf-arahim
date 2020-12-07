const { Schema, model, models } = require("mongoose");

const MiniBlockSchema = new Schema(
  {
    status: { type: String, enum: ["reserved", "available", "paid"] },
    muwaqif: { type: Schema.Types.ObjectId, ref: "Muwaqif" },
    reserved_date: { type: String },
    paid_date: { type: String },
  },
  { timestamps: true }
);

// 'name of model', 'schema', 'collection name'
module.exports = models.MiniBlock || model("MiniBlock", MiniBlockSchema);
