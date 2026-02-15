const express=require("express");
const router=express.Router({mergeParams:true});
const Listing=require("../models/listing.js")
const {reviewSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js")
const Review=require("../models/review.js")
const{isLoggedIn,isAuthor}=require("../middleware.js")
const reviewController=require("../controllers/review.js")
const validateReview=(req,res,next)=>{
  let {error}=reviewSchema .validate(req.body);
  if(error){
    let errMsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
  }else{
    next();
  }
};
//Reviews
//Post route
router.post("/", validateReview,isLoggedIn,reviewController.createReview)
//delete route from reviews
router.delete("/:reviewId",isLoggedIn,isAuthor,reviewController.deleteReview)
module.exports=router;