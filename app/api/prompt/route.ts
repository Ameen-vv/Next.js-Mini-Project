import {NextApiRequest,NextApiResponse} from 'next'
import {connectDB} from '@util/db'
import Prompt from '@model/promptSchema'


export const GET = async(req:NextApiRequest) => {
    try{
        await connectDB()
        const prompts = await Prompt.find({}).populate('creator')
        return new Response(JSON.stringify(prompts),{status:200})
    }catch(err){
        return new Response('failed',{status:500})
    }
}