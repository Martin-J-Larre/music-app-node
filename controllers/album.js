const AlbumModel = require("../models/Album");

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
