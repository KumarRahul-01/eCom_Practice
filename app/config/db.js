const mongoose=require('mongoose');

const dbConnect= async()=>{
    try {
        const connect=await mongoose.connect(process.env.MONGO_URL);
        console.log('Database connected successfully')
        
    } catch (error) {
        console.error('Database connection failed:', error);
       // process.exit(1); // Exit the process with failure
        
    }
}

module.exports=dbConnect;