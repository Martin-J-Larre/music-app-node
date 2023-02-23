const mongoose = require("mongoose");

const ArtistSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: String,
  image: {
    type: String,
    default: "defaul.png",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Artist", ArtistSchema);
