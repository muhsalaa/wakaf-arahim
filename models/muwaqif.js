const { Schema, model, models } = require("mongoose");

const UserSchema = new Schema(
  {
    name: { type: String },
    phone: { type: String },
    ip: { type: String },
    total_bill: { type: Number },
  },
  { timestamps: true }
);

// 'name of model', 'schema', 'collection name'
module.exports = models.User || model("User", UserSchema);
