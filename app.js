if(process.env.NODE_ENV!="production"){
  require('dotenv').config()
}
const express=require("express");
const mongoose=require("mongoose");
const app=express();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const Listing=require("./models/listing.js")
const path=require("path");
const ejsMate=require("ejs-mate");
const methodOverride=require("method-override");
const session=require("express-session");
const MongoStore=require("connect-mongo");
const reviewsRouter=require("./routes/review.js");
const listingRouter=require("./routes/listing.js");
const userRouter=require("./routes/user.js");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
let dbURL=process.env.ATLASDB_URL;
// let MONGO_URL="mongodb://127.0.0.1:27017/wanderlas"
// const listingR=require("./routes/listing.js")
const store=MongoStore.create({
  mongoUrl:dbURL,
  // crypto:{
  //   secret:process.env.SECRET,,
  // },
  touchAfter:24*3600,
})
store.on("error",(err)=>{
  console.log("ERROR IN MONGO SESSION STORE",err)
});
const SessionOption={
  store,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now() +2*24*60*60*1000,
    maxAge:2*24*60*60*1000,
    httpOnly:true,
  }
}

app.use(session(SessionOption));
app.use(flash());// phale flash aayega uske bad route aayga
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")))


async function main(){
  await mongoose.connect(dbURL);
}
main()
.then(()=>{
  console.log("connect the DB")
})
.catch((err)=>{
  console.log(err)
})
// app.get("/",(req,res)=>{
//   res.send("working")
// })
app.get("/test", (req, res) => {
  req.session.username = "Arpit";
  console.log(req.session);
  res.send("Session created, cookie check karo 🍪");
});
app.get("/testListing",async(req,res)=>{
  let sampleList=new Listing({
    title:"my new villa",
    description:"By the beach",
    price:1220,
    location:"goa,calangute",
    
    country:"india",
  })
  await sampleList.save();
  console.log("sample wae saved")

  res.send("working!")
})

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  next();
})
// app.get("/demouser",async(req,res)=>{
//   let fakeUser=new User({
//     email:"arpitpanwar9it@gmail.com",
//     username:"arpitpanwar",
//   });
//  let registerUser=await User.register(fakeUser,"helloworld");
//  res.send(registerUser);
// })

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewsRouter)
app.use("/",userRouter)

// app.use((err,req,res,next)=>{
//   res.render("Error.ejs")
// })
app.use((err, req, res, next) => {
  console.log(" ERROR:", err);
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(8080,  ()=>{
  console.log("server is listening to port 8080")
})


