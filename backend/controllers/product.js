import Product from "../models/product.js";
import formidable from "formidable";
import _ from "lodash";
import fs from "fs";

//middleware
export const getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((error, product) => {
      if (error) {
        return res.status(400).json({
          error: "no product found",
        });
      }
      req.product = product;
      next();
    });
};

//post product
export const createProduct = (req, res) => {
  //store value in form
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  //parse field and file
  form.parse(req, (error, field, file) => {
    if (error) {
      return res.status(400).json({
        error: "problem with your file",
      });
    }

    const { name, description, price, category, stock, photo } = field;

    //validation
    if (!name || !description || !price || !category || !stock) {
      res.status(400).json({
        error: "please fill all filed",
      });
    }

    let product = new Product(field);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "file is too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //save product
    product.save((error, product) => {
      if (error) {
        res.status(400).json({
          error: "field to save the product",
        });
      }
      res.json(product);
    });
  });
};

//get product
export const getProduct = (req, res) => {
  // req.product.photo=undefined
  res.json(req.product);
};

//middleware for photo
export const photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

//update product
export const updateProduct = (req, res) => {
  //store value in form
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  //parse field and file
  form.parse(req, (error, field, file) => {
    if (error) {
      return res.status(400).json({
        error: "problem with your file",
      });
    }

    let product = req.product;

    product = _.extend(product, field);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "file is too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //save product
    product.save((error, product) => {
      if (error) {
        res.status(400).json({
          error: "field to update the product",
        });
      }
      res.json(product);
    });
  });
};

export const deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((error, product) => {
    if (error) {
      return res.status(400).json({
        error: `failed to remove ${product}`,
      });
    }
    res.json({
      message: `succefully remove ${product}`,
    });
  });
};

export const getAllProduct = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Product.find()
    .select(-photo)
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .populate("category")
    .exec((error, products) => {
      if (error) {
        return res.status(400).json({
          error: "not found any product",
        });
      }
      res.json(products);
    });
};

export const updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.quantity, sold: +prod.quantity } },
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (error, products) => {
    if (error) {
      return res.status(400).json({
        error: "operation faild",
      });
    }
  });
  next();
};

export const getAllUniqueCategory = (req, res) => {
  Product.distinct("category", {}, (error, product) => {
    if (error) {
      return res.status(400).json({
        error: "no category found",
      });
    }
  });
};
