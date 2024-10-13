import { Product } from "../models/products.model.js";
import mongoose from "mongoose";

export const getProducts = async (req,res)=>{
  try {
    const allProducts = await Product.find({});
    res.status(201).json({success: true, data:allProducts })
  } catch (error) {
    console.log("Error in displaying ", error.message);
    res.status(500).json({success: false, message: "cannot display "})
    
    
  }
}


export const createProduct = async (req,res)=>{
  const product = req.body;

  if(!product.name || !product.price || !product.image){
    res.status(400).json({success: false, message: "Please provide all fields"})
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save()
    res.status(200).json({success: true, data: newProduct})
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({success: false, message: "Server Error"})
  }
  
  
}

export const deleteProduct =  async (req,res)=>{
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(500).json({success: false, message: "Invalid ObjectId"})
  }
  try {
    await Product.findByIdAndDelete(id);
    res.status(201).json({success:true, message:"Product deleted"})
  } catch (error) {
    console.log("error in deleteing",error.message)
    res.status(404).json({success: false, message: "Cant delete product"})
  }

}

export const updateProduct = async (req,res)=>{
  const {id} = req.params
  const product = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(500).json({success: false, message: "Invalid ObjectId"})
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id,product,{new: true})
    res.status(201).json({success: true, data:updatedProduct })
  } catch (error) {
    
    console.log("Error in Updating ", error.message);
    res.status(500).json({success: false, message: "cannot display "})
  }
}