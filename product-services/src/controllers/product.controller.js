import mongoose from "mongoose";
import productModel from "../models/product.model.js";
import { uploadImage } from "../services/imagekit.service.js";


export const createProduct = async (req, res) => {
  try {
    const { title, description, priceAmount, priceCurrency = "INR" } = req.body;
    const seller = req.user.id; // Extract seller from authenticated user

    const price = {
      amount: Number(priceAmount),
      currency: priceCurrency,
    };

    const images = await Promise.all(
      (req.files || []).map((file) => uploadImage({ buffer: file.buffer })),
    );

    const product = await productModel.create({
      title,
      description,
      price,
      seller,
      images,
    });

    return res.status(201).json({
      message: "Product created",
      data: product,
    });
  } catch (err) {
    console.error("Create product error", err);
  }
};
