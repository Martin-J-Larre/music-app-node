const mongoosePagination = require("mongoose-pagination");

const ArtistModel = require("../models/Artist");

exports.saveArtist = (req, res) => {
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
