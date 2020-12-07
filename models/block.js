const { Schema, model, models } = require("mongoose");

const BlockSchema = new Schema(
  {
    status: { type: String, enum: ["reserved", "available", "paid"] },
    share: { type: Boolean },
    muwaqif: { type: Schema.Types.ObjectId, ref: "User" },
    mini_blocks: [{ type: Schema.Types.ObjectId, ref: "MiniBlock" }],
    reserved_date: { type: String },
    paid_date: { type: String },
    available: { type: Number, default: 1 },
  },
  { timestamps: true }
);

// 'name of model', 'schema', 'collection name'
module.exports = models.Block || model("Block", BlockSchema);
