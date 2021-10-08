import Category from "../models/category.js";


//middleware 
export const getCategoryById=(req,res,next,id)=>{
    Category.findById(id).exec((error,cate)=>{
        if(error){
            return res.status(400).json({
                error:"no category found"
            })
        }
        req.category=cate;
        next();
    })
}


//create category
export const createCategory=(req,res)=>{
    const category=new Category(req.body);
    category.save((error,cate)=>{
        if(error){
            res.status(400).json({
                error:"category already available"
            })
        }
        res.json(cate) 
    });
}


//get category
export const getCategory=(req,res)=>{
return res.json(req.category);
}

export const getAllCategory=(req,res)=>{
    Category.find({}).exec((error,categories)=>{
        if(error){
            res.status(400).json({
                error:"categories not found"
            })
        }
        res.json(categories)
    })
}


//update categories
export const updateCategory=(req,res)=>{
  const category=req.category
  category.name=req.body.name
  category.save((error,updatedCategory)=>{
      if(error){
          return res.status(400).json({
            error:"failed to update category"
          })
      }
      res.json({
          message:"category updated"
      })
  })
}


//delete catetory
export const daleteCategory=(req,res)=>{
    const category=req.category
    category.remove((error,category)=>{
        if(error){
            return res.status(400).json({
                error:"unble to remove category"
            })
        }
        res.json({
            message:`succssefully deleted the ${category} category`
        })
    })
}
