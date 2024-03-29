'use client'
import {FormEventHandler, useEffect, useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form'
import {toast} from 'react-hot-toast'



type Post = {
    prompt:string,
    tag:string
}



const page : React.FC = () => {


  const router = useRouter()
  const {data:session} = useSession()
    
  const [submit,setSubmit] = useState<boolean>(false)
  const [post,setPost] = useState<Post>({
    prompt:'',
    tag:''
  })


  useEffect(()=>{
    !session?.user && toast.error('please Sign In')
    !session?.user && router.push('/')
  },[session?.user])


  const createPrompt:FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setSubmit(true)
    try{
        const response = await fetch('/api/prompt/new',{
            method:'POST',
            body:JSON.stringify({
                prompt:post.prompt,
                userId:session?.user.id,
                tag:post.tag
            })
        })

        response.ok && router.push('/') 
    }catch(err){
        console.log(err)
    }
    finally{
      setSubmit(false)
    }
  }

  return (
    <Form 
    type='create'
    post={post}
    setPost = {setPost}
    submitting = {submit}
    handleSubmit = {createPrompt}
    />
  )
}


export default page
