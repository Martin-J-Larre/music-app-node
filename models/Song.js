const mongoose = require("mongoose");

const SongSchema = mongoose.Schema({
  album: {
    type: mongoose.Schema.ObjectId,
    ref: "Album",
  },
  track: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  duration: {
    type: String,
    require: true,
  },
  file: {
    type: String,
    require: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Song", SongSchema);
