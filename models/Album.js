const mongoose = require("mongoose");

const AlbumSchema = mongoose.Schema({
  artist: {
    type: mongoose.Schema.ObjectId,
    ref: "Artist",
  },
  title: {
    type: String,
    require: true,
  },
  description: String,
  year: {
    type: Number,
    require: true,
  },
  title: {
    type: String,
    default: "default.png",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Album", AlbumSchema);
