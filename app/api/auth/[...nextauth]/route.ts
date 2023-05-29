import { connectDB } from "@util/db";
import NextAuth, { Session, User as NextAuthUser } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import User from "@model/userSchema";
import { NextApiHandler } from "next";


// interface CustomSession extends Session {
//     user: {
//         id: string;
//         email: string;
//         [key: string]: any;
//     };
// }

// interface CustomUser extends NextAuthUser {
//     email: string;
//     name: string;
//     picture: string;
// }



const handler : NextApiHandler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    callbacks:{
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })

            session.user.id = sessionUser._id.toString()
    
            return session
        },
        async signIn({ profile }) {
            try {
                await connectDB()
                const userExist = await User.findOne({
                    email: profile.email
                })
                if (!userExist) {
                    await User.create({
                        email: profile.email,
                        userName: profile.name.replace(' ', '').toLowerCase(),
                        image: profile.picture
                    })
                } 
                return true
            } catch (err) {
                return false
            }
        }
    }
    
   
})


export { handler as GET, handler as POST }