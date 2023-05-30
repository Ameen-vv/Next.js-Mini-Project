import {NextApiRequest,NextApiResponse} from 'next'
import {connectDB} from '@util/db'
import Prompt from '@model/promptSchema'

export const POST = async (req:NextApiRequest,res:NextApiResponse) =>{
    const {userId,prompt,tag} = await req.json()
    console.log(tag)
    try{
        console.log('1')
        await connectDB()
        console.log('2')
        const newPrompt = new Prompt({
            creator:userId,
            tag:tag,
            prompt

        })
        console.log('3')
        await newPrompt.save()
        return new Response(JSON.stringify(newPrompt),{status:200})
        
    }catch(err){
        console.log(err)
        return new Response('server error',{status:500})
    }
}