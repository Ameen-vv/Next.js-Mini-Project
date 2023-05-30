import {connectDB} from '@util/db'
import Prompt from '@model/promptSchema'


export const GET = async (req,{params}) => {
    try{
        connectDB()
        const prompt = await Prompt.find({creator:params.id}).populate('creator')
        if(!prompt) return new Response('prompt not found',{status:404})
        return new Response(JSON.stringify(prompt),{status:200})
    }catch(err){
        return new Response('sever error',{status:500})
    }
}