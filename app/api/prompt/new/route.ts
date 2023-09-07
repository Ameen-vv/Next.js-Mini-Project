import {NextApiRequest,NextApiResponse} from 'next'
import {connectDB} from '@util/db'
import Prompt from '@model/promptSchema'

export const POST = async (req:NextApiRequest,res:NextApiResponse) =>{
    const {userId,prompt,tag} = await req.json()
    try{
         connectDB()
        const newPrompt = new Prompt({
            creator:userId,
            tag:tag,
            prompt

        })
        await newPrompt.save()
        return new Response(JSON.stringify(newPrompt),{status:200})
        
    }catch(err){
        return new Response('server error',{status:500})
    }
}