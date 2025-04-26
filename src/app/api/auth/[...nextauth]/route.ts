import NextAuth from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";


export const authentication = NextAuth({
    providers : [
        CredentialsProvider({
           name : 'Credentials' , 
           credentials : {
            email : {label : 'email' , type : 'email'} , 
            password : {label : 'password' , type :  'password'}
           } , 
           async authorize(credentials) { 
              const user = {id : '1' , name : 'Sourena Yazdi' , email : 'yazdi_sourena@yahoo.com' , password : 'Sourena@1384'};
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