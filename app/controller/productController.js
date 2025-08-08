const image = require("../model/image");
const Product = require("../model/product");
const Register = require("../model/register");
const Details = require("../model/details");
const Rating = require("../model/rating");
const mongoose = require("mongoose");

class productController {
  async addProduct(req, res) {
    try {
      const { Pname, price } = req.body;

      const newProcuct = new product({ Pname, price });
      await newProcuct.save();

      res.status(201).json({
        status: "true",
        message: "Product added successfully",
        product: newProcuct,
      });
    } catch (error) {
      res
        .status(500)
        .json({ status: "false", message: "Internal Server Error" });
    }
  }

  async registerProduct(req, res) {
    try {
      const { registerBy, productId } = req.body;

      const newRegister = new Register({ registerBy, productId });
      await newRegister.save();

      res.status(201).json({
        status: "true",
        message: "Product registered successfully",
        register: newRegister,
      });
    } catch (error) {
      res.send({
        status: "false",
        message: "Internal Server Error",
      });
    }
  }
  async productImg(req, res) {
    try {
      const { img, productId } = req.body;

      const newImg = new image({ img, productId });
      await newImg.save();

      res.status(201).json({
        status: "true",
        message: "Image added successfully",
        image: newImg,
      });
    } catch (error) {
      res.staus(500).json({
        status: "false",
        message: "Internal Server Error",
      });
    }
  }

  async addDetails(req, res) {
    try {
      const { size, color, price, productId } = req.body;

      const newDetails = new Details({ size, color, price, productId });
      await newDetails.save();

      res.status(201).json({
        status: "true",
        message: "Details added successfully",
        details: newDetails,
      });
    } catch (error) {
      res.status(500).json({
        status: "false",
        message: "Internal Server Error",
      });
    }
  }

  async addRating(req, res) {
    try {
      const { rating, productId } = req.body;

      const newRating = new Rating({ rating, productId });
      await newRating.save();
      res.status(201).json({
        status: true,
        message: "Rating added successfully",
        rating: newRating,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  }

  async productDetails(req, res) {
    try {
      const productDetails = await Product.aggregate([
        {
          $lookup: {
            from: "details",
            localField: "_id",
            foreignField: "productId",
            as: "details",
          },
        },
        {
          $lookup: {
            from: "images",
            localField: "_id",
            foreignField: "productId",
            as: "images",
          },
        },
        {
          $lookup: {
            from: "registers",
            localField: "_id",
            foreignField: "productId",
            as: "registers",
          },
        },
        {
          $lookup: {
            from: "ratings",
            localField: "_id",
            foreignField: "productId",
            as: "ratings",
          },
        },
        {
          $project: {
            _id: 1,
            Pname: 1,
            price: 1,
            details: {
              size: "$details.size",
              color: "$details.color",
              price: "$details.price",
            },
            images: "$images.img",
            registerBy: "$registers.registerBy",
            ratings: "$ratings.rating",
          },
        },
      ]);

      res.status(200).json({
        status: "true",
        total: productDetails.length,
        message: "Product details fetched successfully",
        product: productDetails,
      });
    } catch (error) {
      res.status(500).json({
        status: "false",
        message: "Internal Server Error",
      });
    }
  }

  async productDetailsById(req, res) {
    try {
      const { productId } = req.params;
      // if (!mongoose.Types.ObjectId.isValid(productId)) {
      //   return res.status(400).json({
      //     status: false,
      //     message: "Invalid productId",
      //   });
      // }

      const productDetails = await Product.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(productId) },
        },
        {
          $lookup: {
            from: "details",
            localField: "_id",
            foreignField: "productId",
            as: "details",
          },
        },
        {
          $lookup: {
            from: "images",
            localField: "_id",
            foreignField: "productId",
            as: "images",
          },
        },
        {
          $lookup: {
            from: "registers",
            localField: "_id",
            foreignField: "productId",
            as: "registers",
          },
        },
        {
          $lookup: {
            from: "ratings",
            localField: "_id",
            foreignField: "productId",
            as: "ratings",
          },
        },
        {
          $project: {
            _id: 1,
            Pname: 1,
            price: 1,
            details: {
              size: "$details.size",
              color: "$details.color",
              price: "$details.price",
            },
            //   details: {
            //   size: { $arrayElemAt: ["$details.size", 0] },
            //   color: { $arrayElemAt: ["$details.color", 0] },
            //   price: { $arrayElemAt: ["$details.price", 0] },
            // },
            images: "$images.img",
            registerBy: "$registers.registerBy",
            ratings: "$ratings.rating",
          },
        },
      ]);

      res.status(200).json({
        status: true,
        message: "Product details fetched successfully",
        product: productDetails,
      });
    } catch (error) {
      res.status(500).json({
        status: "false",
        message: "Internal Server Error",
        error: error.message, // send the error to debug faster
      });
    }
  }

  async avgPrice(req, res) {
    try {
      const result = await product.aggregate([
        {
          $group: {
            _id: null, // group all documents together
            avgPrice: { $avg: "$price" },
          },
        },
        {
          $project: {
            _id: 0,
            avgPrice: { $round: ["$avgPrice", 2] }, // optional: round to 2 decimal places
          },
        },
      ]);

      res.status(200).json({
        status: "true",
        message: "Average price fetched successfully",
        averagePrice: result[0]?.avgPrice || 0,
      });
    } catch (error) {
      res.status(500).json({
        status: "false",
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
}

module.exports = new productController();
