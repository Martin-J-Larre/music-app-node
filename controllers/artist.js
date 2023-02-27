const mongoosePagination = require("mongoose-pagination");
const fs = require("fs");
const path = require("path");

const ArtistModel = require("../models/Artist");
const AlbumModel = require("../models/Album");
const SongModel = require("../models/Song");

exports.createArtist = (req, res) => {
  const data = req.body;

  if (!data.name) {
    return res.status(500).json({
      status: "error",
      message: "Error field name is required",
    });
  }

  const artist = new ArtistModel(data);

  artist.save((error, artistSaved) => {
    if (error || !artistSaved) {
      return res.status(400).json({
        status: "error",
        message: "Error artist could not be saved",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Artist saved successfully",
      artistSaved,
    });
  });
};

exports.getOneArtist = (req, res) => {
  const id = req.params.id;

  ArtistModel.findById(id, (error, artist) => {
    if (error || !artist) {
      return res.status(404).json({
        status: "error",
        message: "Error artist could not be found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Artist found successfully",
      artist,
    });
  });
};

exports.getAllArtists = (req, res) => {
  let page = 1;
  const itemPerPage = 5;

  if (req.params.page) page = req.params.page;

  ArtistModel.find()
    .sort("name")
    .paginate(page, itemPerPage, (error, artists, total) => {
      if (error || !artists) {
        return res.status(404).json({
          status: "error",
          message: "Error Artist could not be found",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "All artist found",
        totalArtists: total,
        itemPerPage,
        page,
        artists,
      });
    });
};

exports.updateArtist = (req, res) => {
  const artistId = req.params.id;
  const dataToUpdate = req.body;

  // TODO: Add a validator
  ArtistModel.findByIdAndUpdate(
    artistId,
    dataToUpdate,
    { new: true },
    (error, artistUpdated) => {
      if (error || !artistUpdated) {
        return res.status(400).json({
          status: "error",
          message: "Error artist could not be updated",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Artist updated successfully",
        artistUpdated,
      });
    }
  );
};

exports.deleteArtist = async (req, res) => {
  const artistId = req.params.id;
  try {
    const artistDeleted = await ArtistModel.findByIdAndDelete(artistId);
    const albumDeleted = await AlbumModel.find({ artist: artistId });

    albumDeleted.forEach(async (album) => {
      const songDeleted = await SongModel.find({
        album: album._id,
      }).remove();

      album.remove();
    });

    return res.status(200).json({
      status: "success",
      message: "Artist deleted successfully",
      artistDeleted,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: "Error artist could not be deleted",
      error,
    });
  }
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

  ArtistModel.findOneAndUpdate(
    { _id: req.params.id },
    { image: req.file.filename },
    { new: true },
    (error, artistUpdated) => {
      if (error || !artistUpdated) {
        return res.status(404).json({
          status: "error",
          message: "Error file could not be updated",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "File updated successfully",
        file: req.file,
        artistUpdated,
      });
    }
  );
};

exports.getImage = (req, res) => {
  const file = req.params.file;

  const filePath = "./uploads/artists/" + file;

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
