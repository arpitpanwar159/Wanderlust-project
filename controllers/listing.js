const Listing=require("../models/listing");
module.exports.index=async(req,res)=>{
  let allListings=await Listing.find({});
  res.render("listings/index.ejs",{allListings})
}
module.exports.newRenderForm=(req,res)=>{
 
  res.render("listings/new.ejs")
}
module.exports.show=async(req,res)=>{
  const listing=await Listing.findById(req.params.id).populate({path:"reviews",populate:{path:"author",}}).populate("owner");
  if(!listing){
    req.flash("error","Not exist!");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs",{listing})
  // console.log(listing)
}
module.exports.create=async(req,res,next)=>{
  let url=req.file.path;
  let filename=req.file.filename;
  let newListing=new Listing(req.body.listing);
  newListing.owner=req.user._id;
  newListing.image={url,filename};
  await newListing.save();
  req.flash("success","New Listing Created!");
  res.redirect("/listings")
  console.log(newListing)
}
module.exports.editRenderForm=async(req,res)=>{
    let{id}=req.params;
  const listing=await Listing.findById(id);
  if(!listing){
    req.flash("error","Not exist!");
    res.redirect("/listings");
  }
  // let originalImage=listing.image.url;
  //  originalImage=originalImage.replace("/upload"," /upload/h_300,w_250");
  res.render("listings/edit.ejs",{listing});

}
module.exports.updateRoute=async (req,res)=>{
  let {id}=req.params;
  let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});
 if( typeof req.file!=="undefined"){
   let url=req.file.path;
  let filename=req.file.filename;
  listing.image={url,filename};
  await listing.save();
 }
  res.redirect("/listings");
}
module.exports.deleteRoute=async(req,res)=>{
  let {id}=req.params;
   await Listing.findByIdAndDelete(id);
   res.redirect("/listings")
}