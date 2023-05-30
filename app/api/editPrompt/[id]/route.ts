import {connectDB} from '@util/db'
import Prompt from '@model/promptSchema'
import { NextApiHandler } from 'next'
import { useParams } from 'next/navigation'


export const POST:NextApiHandler = async (req,{params}) => {
    const {prompt,tag} = await req?.json()
    try{
        
        connectDB()
        await Prompt.updateOne({_id:params.id},{$set:{prompt,tag}}).then((response)=>{
            console.log(response.acknowledged,'sd')
            if(response.acknowledged){
                return new Response('updated',{status:200})
            }else{
                return new Response('prompt not found',{status:404})
            }
        })
        console.log('1')
    }catch(err){
        console.log(err)
        return new Response("error",{status:500})
    }
}