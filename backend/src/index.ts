import { app, server } from "./utils/app";
import { connectDB } from "./utils/db";

server.listen(process.env.PORT || 5001,()=>{
    console.log("Server started at http://localhost:",process.env.PORT || 5001);
    
    connectDB()
})

