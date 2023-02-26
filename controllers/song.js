const SongModel = require("../models/Song");

exports.createSong = (req, res) => {
  dataSong = req.body;

  song = new SongModel(dataSong);
  song.save((error, songSaved) => {
    if (error || !songSaved) {
      return res.status(500).json({
        status: "error",
        message: "Error song could not be saved",
        song,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Song saved successfully",
      songSaved,
    });
  });
};

exports.getOneSong = (req, res) => {
  const songId = req.params.id;

  SongModel.findById(songId)
    .populate("album")
    .exec((error, song) => {
      if (error || !song) {
        return res.status(404).json({
          status: "error",
          message: "Error song could not be found",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Song found successfully",
        song,
      });
    });
};

exports.getAllSongs = (req, res) => {
  const albumId = req.params.albumId;

  SongModel.find({ album: albumId })
    .sort("track")
    .populate({ path: "album", populate: { path: "artist" } })
    .exec((error, songs) => {
      if (error || !songs) {
        return res.status(404).json({
          status: "error",
          message: "Error songs could not be found",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Songs found successfully",
        songs,
      });
    });
};

exports.updateSong = (req, res) => {
  const sondId = req.params.id;
  return res.status(200).json({
    status: "success",
    message: "Song updated successfully",
  });
};
