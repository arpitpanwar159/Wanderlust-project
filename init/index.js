const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");
// const { init } = require("../models/listing");
let MONGO_URL="mongodb://127.0.0.1:27017/wanderlas"
async function main(){
  await mongoose.connect(MONGO_URL);
}
main()
.then(()=>{
  console.log("connect the DB")
})
.catch((err)=>{
  console.log(err)
})
const initDb=async()=>{
await Listing.deleteMany({});
const userId = new mongoose.Types.ObjectId('697b119b62e8bc887fd4b256');
initData.data=initData.data.map((obj)=>({...obj,owner:userId}));
 await Listing.insertMany(initData.data);
console.log("data was initialized");
}
initDb();