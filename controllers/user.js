const User=require("../models/user.js");
module.exports.renderSignup=(req,res)=>{
  res.render("user/signup.ejs")
}
module.exports.postSignup= async(req,res)=>{
  try{let {username,email,password}=req.body;
  const newUser=new User({
    email,username
  });
  let registerUser= await User.register(newUser,password);
  req.login(registerUser,((err)=>{
    if(err){
      return next(err);
    }
     req.flash("success","Welcome to WanderLust!");
  res.redirect("/listings")
  }))
 

  } catch(e){
  req.flash("error",e.message);
  res.redirect("/signup")
  }

}
module.exports.loginForm=(req,res)=>{
  res.render("user/login.ejs");

}
module.exports.login=(req, res) =>{
    req.flash("success","Welcome back to WanderLust!");
    res.redirect(res.locals.redirectUrl||"/listings");
  }
  module.exports.logout=(req,res)=>{
  req.logout((err)=>{
 if(err){
  return next(err)
 }
 req.flash("success","you are logout!");
 res.redirect("/listings")
  })
}