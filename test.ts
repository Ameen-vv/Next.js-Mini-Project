import { NextApiHandler } from 'next';
import { getSession } from 'next-auth/client';
import { connectDB } from '@util/db';
import NextAuth, { Session, User as NextAuthUser } from 'next-auth';
import { User as UserSchema } from '@model/userSchema';
import GoogleProvider from 'next-auth/providers/google';

interface CustomSession extends Session {
  user: {
    id: string;
    email: string;
    [key: string]: any;
  };
}

interface CustomUser extends NextAuthUser {
  email: string;
  name: string;
  picture: string;
}

const handler: NextApiHandler = async (req, res) => {
  try {
    await connectDB();

    const session = await getSession({ req });
    const customSession: CustomSession = session as CustomSession;

    if (req.method === 'POST' && customSession) {
      const userExist = await UserSchema.findOne({ email: customSession.user.email });

      if (!userExist) {
        await UserSchema.create({
          email: customSession.user.email,
          username: customSession.user.name.replace(' ', '').toLowerCase(),
          image: customSession.user.picture,
        });
      } else {
        // Handle existing user case
      }

      return res.status(200).json({ success: true });
    }

    return res.status(200).json({ success: false });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  session: {
    async session(session, user: CustomUser) {
      const sessionUser = await UserSchema.findOne({ email: user.email });

      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
      }

      return session;
    },
  },
};

export default NextAuth(options);
export { handler };
