const express=require("express");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({ storage })
const router=express.Router();
const {listingSchema,reviewSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js")
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner}=require("../middleware.js");
const listingController=require("../controllers/listing.js");
const validateListing=(req,res,next)=>{
  let {error}=listingSchema.validate(req.body);
  if(error){
    let errMsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
  }else{
    next();
  }
};

//index route
router.get("/",listingController.index)
//new route
router.get("/new", isLoggedIn,listingController.newRenderForm)
//show route
router.route("/:id")
.put( upload.single("listing[image]"),validateListing, isLoggedIn,isOwner,listingController.updateRoute)
.delete(isLoggedIn,isOwner,listingController.deleteRoute)
.get(listingController.show)
//Create route
try{
  router.post("/", isLoggedIn, upload.single('listing[image]'),listingController.create)
  // router.post("/",upload.single('listing[image]'),(req,res)=>{
  //   res.send(req.file);
  // })
}
catch(err){
  next(err)
}
//edit route
router.get("/:id/edit", isLoggedIn,isOwner,listingController.editRenderForm)

module.exports=router;