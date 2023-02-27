const fs = require("fs");
const path = require("path");

const AlbumModel = require("../models/Album");
const SongModel = require("../models/Song");

exports.createAlbum = (req, res) => {
  const dataAlbum = req.body;

  const album = new AlbumModel(dataAlbum);
  album.save((error, albumSaved) => {
    if (error || !albumSaved) {
      return res.status(404).json({
        status: "error",
        message: "Error album could not be saved",
        album,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Album saved successfully",
      album: albumSaved,
    });
  });
};

exports.getOneAlbum = (req, res) => {
  const albumId = req.params.id;

  AlbumModel.findById(albumId)
    .populate({ path: "artist" })
    .exec((error, album) => {
      if (error || !album) {
        return res.status(404).json({
          status: "error",
          message: "Error album could not be found",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Album found successfully",
        album,
      });
    });
};

exports.getAllAlbums = (req, res) => {
  const artistId = req.params.artistId;

  if (!artistId) {
    return res.status(404).json({
      status: "error",
      message: "Error artist could not be found",
    });
  }

  AlbumModel.find({ artist: artistId })
    .populate("artist")
    .exec((error, albums) => {
      if (error || !albums) {
        return res.status(404).json({
          status: "error",
          message: "Error albums could not be found",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Albums found successfully",
        albums,
      });
    });
};

exports.updateAlbum = (req, res) => {
  const albumId = req.params.id;
  const dataToUpdate = req.body;

  AlbumModel.findByIdAndUpdate(
    albumId,
    dataToUpdate,
    { new: true },
    (error, albumUpdated) => {
      if (error || !albumUpdated) {
        return res.status(500).json({
          status: "error",
          message: "Error album could not be updated",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Album updated successfully",
        albumUpdated,
      });
    }
  );
};

exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(404).json({
      status: "error",
      message: "Error file do not exist",
      file: req.file,
    });
  }

  const nameFile = req.file.originalname;
  const nameFileSplit = nameFile.split(".");
  const extension = nameFileSplit[1];

  if (
    extension != "png" &&
    extension != "jpg" &&
    extension != "jpeg" &&
    extension != "gif"
  ) {
    const filePath = req.file.path;
    const deleteFile = fs.unlinkSync(filePath);

    return res.status(404).json({
      status: "error",
      message: "Error format file is not valid",
    });
  }

  AlbumModel.findOneAndUpdate(
    { _id: req.params.id },
    { image: req.file.filename },
    { new: true },
    (error, albumUpdated) => {
      if (error || !albumUpdated) {
        return res.status(404).json({
          status: "error",
          message: "Error file could not be updated",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "File updated successfully",
        file: req.file,
        albumUpdated,
      });
    }
  );
};

exports.getImage = (req, res) => {
  const file = req.params.file;

  const filePath = "./uploads/albums/" + file;

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

exports.deleteAlbum = async (req, res) => {
  const albumId = req.params.id;
  try {
    const albumDeleted = await AlbumModel.findById(albumId).remove();
    const songDeleted = await SongModel.find({ album: albumId }).remove();

    return res.status(200).json({
      status: "success",
      message: "Album deleted successfully",
      albumDeleted,
      songDeleted,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: "Error album could not be deleted",
      error,
    });
  }
};
