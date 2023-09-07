import {connectDB} from '@util/db'
import Prompt from '@model/promptSchema'
import { NextApiHandler } from 'next'

export const GET:NextApiHandler = async (req,{params}) => {
    try{
        connectDB()
        const prompt = await Prompt.findById(params.id).populate('creator')
        if(!prompt) return new Response('prompt not found',{status:404})
        return new Response(JSON.stringify(prompt),{status:200})
    }catch(err){
        return new Response('sever error',{status:500})
    }
}

export const PATCH:NextApiHandler = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
         connectDB();

        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};
export const POST:NextApiHandler = async (req,{params}) => {
    try{
        connectDB()
        const {prompt,tag} = await req.json()
        await Prompt.updateOne({_id:params.id},{$set:{prompt,tag}}).then((response)=>{
            console.log(response.acknowledged,'sd')
            if(response.acknowledged){
                return new Response('updated',{status:200})
            }else{
                return new Response('prompt not found',{status:404})
            }
        })
    }catch(err){
        return new Response("error",{status:500})
    }
}


export const DELETE:NextApiHandler = async(req,{params}) => {
    try{
        connectDB()
        await Prompt.findByIdAndRemove(params.id)
        return new Response("deleted",{status:200})
    }catch(err){
        return new Response("error",{status:500})
    }
}