const image = require("../model/image");
const product = require("../model/product");
const Register = require("../model/register");

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

  async productDetails(req, res) {
    try {
      const { productId } = req.params;

      const productDetails = await product.aggregate([
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
          $project: {
            _id: 1,
            Pname: 1,
            price: 1,
            images: 1,
            registerBy: "$registers.registerBy",
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

  //   async showProducts(req,res){
  //     try {

  //         const showproduct= await product.aggregate([
  //             {
  //                 $project:{
  //                     Pname: 1,
  //                     price: 1,
  //                     _id: 1,
  //                     images: 1,
  //                     registerBy:"$registers.registerBy",
  //                 }
  //             }
  //         ])

  //         res.status(200).json({
  //             status:"true",
  //             total:showproduct.length,
  //             message:"Products fetched successfully",
  //             products:showproduct
  //         });

  //     } catch (error) {
  //       res.status(500).json({
  //         status: "false",
  //         message: "Internal Server Error",
  //       });

  //     }
  //   }
}

module.exports = new productController();
