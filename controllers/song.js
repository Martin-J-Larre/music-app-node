const fs = require("fs");
const path = require("path");

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
  const songId = req.params.id;
  const dataToUpdate = req.body;

  SongModel.findByIdAndUpdate(
    songId,
    dataToUpdate,
    { new: true },
    (error, songUpdated) => {
      if (error || !songUpdated) {
        return res.status(500).json({
          status: "error",
          message: "Error song could not be updated ",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Song updated successfully",
        songUpdated,
      });
    }
  );
};

exports.deleteSong = (req, res) => {
  const songId = req.params.id;

  SongModel.findByIdAndRemove(songId, (error, songDeleted) => {
    if (error || !songDeleted) {
      return res.status(404).json({
        status: "error",
        message: "Error song could not be deleted",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Song deleted successfully",
      songDeleted,
    });
  });
};

exports.uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(404).json({
      status: "error",
      message: "Error file do not exist",
    });
  }

  const nameFile = req.file.originalname;
  const nameFileSplit = nameFile.split(".");
  const extension = nameFileSplit[1];

  if (extension != "mp3" && extension != "ogg") {
    const filePath = req.file.path;
    const deleteFile = fs.unlinkSync(filePath);

    return res.status(404).json({
      status: "error",
      message: "Error format file is not valid",
      deleteFile,
    });
  }

  AlbumModel.findOneAndUpdate(
    { _id: req.params.id },
    { file: req.file.filename },
    { new: true },
    (error, songUpdated) => {
      if (error || !songUpdated) {
        return res.status(404).json({
          status: "error",
          message: "Error file could not be updated",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "File updated successfully",
        file: req.file,
        songUpdated,
      });
    }
  );
};

exports.getFile = (req, res) => {
  const file = req.params.file;

  const filePath = "./uploads/songs/" + file;

  fs.stat(filePath, (error, exists) => {
    if (error || !exists) {
      return res.status(404).json({
        status: "error",
        message: "File does not exist",
      });
    }

    return res.sendFile(path.resolve(filePath));
  });
};
