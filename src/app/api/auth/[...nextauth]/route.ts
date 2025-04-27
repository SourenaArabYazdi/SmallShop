import NextAuth from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import GithubProvider from 'next-auth/providers/github'

export const handler = NextAuth({
    providers : [
      GithubProvider({
         clientId : process.env.GITHUB_ID as string , 
         clientSecret : process.env.GITHUB_SECRET as string
      })
      
      , 

        CredentialsProvider({
           name : 'Credentials' , 
           credentials : {
            email : {label : 'email' , type : 'email'} , 
            password : {label : 'password' , type :  'password'}
           } , 
           async authorize(credentials) { 
              const user = {id : '1' , name : 'Sourena Yazdi' , email : 'yazdi_sourena@yahoo.com' , password : 'Sourena@1384' , image : 'https://avatars.githubusercontent.com/u/168073087?v=4'};
              if (credentials?.email === user.email && credentials?.password === user.password) return user;
              return null;
           }
        })
    ] , 
    pages : {
        signIn : '/Website/Forms/SignIn'
    } ,
     session : {
        strategy : 'jwt'
     } , 
     secret : process.env.NEXTAUTH_SECRET, 
})


export {handler as GET , handler as POST}