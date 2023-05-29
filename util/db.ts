import mongoose from "mongoose";


let isConnected : boolean = false

export const connectDB =  () => {
    mongoose.set('strictQuery',true)
    if(isConnected){
        console.log('already connected')
        return
    }
    try{
        mongoose.connect('mongodb://localhost:27017',{
            dbName:'Next_mini_project',
        }).then(()=>{
            isConnected = true
            console.log('db connected')
        })
    }catch(err){
        console.log(err)
    }
} 