import { Account, AuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

const auth: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId:
        '118873240337-54a20fkted3hskldi02fh31fk46rmq11.apps.googleusercontent.com',
      clientSecret: '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'
    }),
    FacebookProvider({
      clientId: '417980397574495',
      clientSecret: '613c9998c0665268400a1af884fe8c4e'
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { type: 'text' },
        password: { type: 'password' }
      },
      authorize(credentials) {
        if (
          credentials?.username === 'admin' &&
          credentials.password === 'admin'
        ) {
          return { id: '1', name: 'admin' };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: '/signin',
    signOut: '/',
  },
  callbacks: {
    async signIn({ account, user }) {
      if (user) {
        if (account?.provider === "google") {
          const email = user.email as string;
          const name = user.name?.split(' ') || ''
          const { data: checkUser } = await axios.get(
            `https://tour-back.uz/api/auth/check-user?email=${email}`);

          if (checkUser.content.data) {
            const body = {
              login: email,
              authTypeId: '2'
            }

            const { data: signInResponse } = await axios.post('https://tour-back.uz/api/auth/sign-in', body);
            console.log(signInResponse, 'data');
            return true
          } else {
            const body = {
              login: email,
              firstName: name[0],
              lastName: name[1],
              pictureURL: user.image,
              authTypeId: '2'
            }


            const { data: signUpResponse } = await axios.post('https://tour-back.uz/api/auth/sign-up', body);

            console.log(signUpResponse);
            return true
          }
        }
      }
      return false
    }
  }

  // callbacks: {
  //   async redirect({baseUrl, url}) {
  //     // Allows relative callback URLs
  //     if (url.startsWith('/')) return `${baseUrl}${url}`;
  //     // Allows callback URLs on the same origin
  //     else if (new URL(url).origin === baseUrl) return url;
  //     return baseUrl;
  //   }
  // }
  // callbacks: {
  //   async signIn({ user }) {
  //     console.log(user);
  //     if (user) {
  //       const email = user.email as string;
  //       const checkUser = await axios.get(
  //         'https://tour-back.uz/api/auth/check-user',
  //         {params: email}
  //       );

  //       console.log(checkUser);
  //       return true;
  //     }
  //     return false;
  //   }
  // }
};

export default auth;
