import mongoose from "mongoose";

const connectToDb=async()=>{
  await mongoose.connect(process.env.URI)
  .then(()=>{console.log("job board database  connected successfully");
  })
  .catch((error)=>{console.log(error);
  })
}

export default connectToDb;