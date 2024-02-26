import {AuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';

const auth: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId:
        '118873240337-54a20fkted3hskldi02fh31fk46rmq11.apps.googleusercontent.com',
      clientSecret: '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'
    }),
    FacebookProvider({
      clientId: '962275354778710',
      clientSecret: '3604c146c66be485c4ac3246d74927b4'
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {type: 'text'},
        password: {type: 'password'}
      },
      authorize(credentials) {
        if (
          credentials?.username === 'admin' &&
          credentials.password === 'admin'
        ) {
          return {id: '1', name: 'admin'};
        }

        return null;
      }
    })
  ],
  pages: {
    error: '/auth/login',
  },
  callbacks: {
    async redirect({baseUrl, url}) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  }
};

export default auth;
