const mongoose = require("mongoose");

const categoryModel = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
    }
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("category", categoryModel);
