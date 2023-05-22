const mongoose = require("mongoose");

const contactModel = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    web: {
      type: String,
    },
    gender: {
      type: String,
    },
    picture: {
      type: String,
    },
    content: {
      type: String,
    }
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("contact", contactModel);
