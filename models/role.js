const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserRoleSchema = new Schema({
  no: {
    type: Number,
    required: true,
  },
  roleName: {
    type: String,
    required: true,
  },
});

module.exports = User = mongoose.model("userRole", UserRoleSchema);
