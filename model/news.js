const mongoose = require("mongoose");

const newsModel = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    description: {
      type: String,
    },
    detail: {
      type: String,
    },
    cat_id: {
      type: String,
    }
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("news", newsModel);
