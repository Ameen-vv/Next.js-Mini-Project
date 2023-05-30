import {connectDB} from '@util/db'
import Prompt from '@model/promptSchema'


export const GET = async (req,{params}) => {
    try{
        connectDB()
        const prompt = await Prompt.findById(params.id).populate('creator')
        if(!prompt) return new Response('prompt not found',{status:404})
        return new Response(JSON.stringify(prompt),{status:200})
    }catch(err){
        return new Response('sever error',{status:500})
    }
}

export const PATCH = async (req,{params}) => {
    try{
        connectDB()
        Prompt.updateOne({_id:params.id}).then((response)=>{
            if(response.acknowledged){
                return new Response('updated',{status:200})
            }else{
                return new Response('prompt not found',{status:404})
            }
        })
    }
    catch{
        return new Response('Server Error',{status:500})
    }
}


export const DELETE = async(req,{params}) => {
    try{
        connectDB()

        await Prompt.findByIdAndRemove(params.id)
        return new Response("deleted",{status:200})
    }catch(err){
        return new Response("error",{status:500})
    }
}