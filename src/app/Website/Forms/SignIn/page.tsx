'use client'

import {Formik , Field , ErrorMessage , Form , } from 'formik';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import {useRouter} from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

import {signIn} from 'next-auth/react'

type UserProps  = {
    email : string , 
    password : string
}


const initialValues : UserProps = {
    email : '' , 
    password : ''
}

const validateSignInSchema = yup.object({
    email : yup.string().email().required('Email is Required') , 
    password : yup.string().required('Password is Required').min(7 , 'password must be at least 7 characters')
})


export default function SignInPage(){
   const router = useRouter();

   const handleSubmit = async (values : {email : string  , password : string}) => {
        const res = await signIn('credentials' , {
            redirect : false , 
            email : values.email , 
            password : values.password
        });

        if (res?.ok) router.push('/Website')
        else throw new Error('cant sign in !')

   }

    return (
        <div className='min-h-screen bg-black flex  justify-center items-center'>
          <Card className='bg-white min-h-[400px] w-[400px]'>
            <CardHeader>
              <CardTitle className='items-center justify-center flex text-3xl  font-mono'>SignIn</CardTitle>    
            </CardHeader>
            <CardContent>

                   <Formik 
                    initialValues={initialValues}
                     validationSchema={validateSignInSchema}
                     onSubmit={handleSubmit}
                   >
                    {({isSubmitting}) => (
                        <Form>
                               <div className=' p-3'>
                                <Label className='mb-2'>Email</Label>
                                 <Field as = {Input} name = 'email' type = 'email'  />
                                 <ErrorMessage name='email' />
                               </div>

                               <div className=' p-3'>
                                <Label className='mb-2'>Password</Label>
                                 <Field as = {Input} name = 'password' type = 'password'  />
                                 <ErrorMessage name='password'/>
                               </div>


                               <CardFooter className=''> 

                                  <Button className='border min-w-[100%] bg-black text-white ' type='submit'>
                                     Sign In
                                  </Button>
                               </CardFooter>
                        </Form>
                    )}




                   </Formik>
            </CardContent>
          </Card>
        </div>
    )
}