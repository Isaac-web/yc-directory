import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

import { GET_USER_BY_GITHUB_ID } from './sanity/lib/queries';
import { client } from './sanity/lib/client';
import { writeClient } from './sanity/lib/write-client';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, profile }) {
      if (user && profile) {
        const existingUser = await client
          .withConfig({ useCdn: false })
          .fetch(GET_USER_BY_GITHUB_ID, {
            id: profile?.id,
          });

        if (!existingUser) {
          const newUser = {
            id: profile?.id,
            name: user?.name,
            email: user?.email,
            username: profile?.login || 'default',
            image: user?.image,
            bio: profile?.bio,
          };

          await writeClient.create({
            _type: 'author',
            ...newUser,
          });
        }
      }

      return true;
    },
    async jwt({ token, profile }) {
      if (profile) {
        const existingUser = await client
          .withConfig({ useCdn: false })
          .fetch(GET_USER_BY_GITHUB_ID, {
            id: profile?.id,
          });

        token.id = existingUser?._id;
      }

      return token;
    },
    async session({ session, token }) {
      session.id = token.id as string;
      return session;
    },
  },
});
