'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
const formSchema = z.object({
  username: z.string().min(2).max(50),
});
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/dist/client/link';
type FormType = 'sign-in' | 'sign-up';

const AuthFormSchema = (formType: FormType) => {
  return z.object({
    username: z.string().min(2).max(50),
    email: z.string().email(),
    fullName:
      formType === 'sign-up' ? z.string().min(2).max(100) : z.undefined(),
  });
};

const AuthForm = ({ type }: { type: 'sign-in' | 'sign-up' }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const formSchema = AuthFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title flex justify-center ">
            {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
          </h1>
          {type === 'sign-up' && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="shad-form-label">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Your Full Name"
                        className="shad-input"
                        {...field}
                      />
                    </FormControl>
                  </div>

                  <FormMessage className="shadow-input-message" />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your Full Email Address"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage className="shadow-input-message" />
              </FormItem>
            )}
          />
          <Button
            className="form-submit-button"
            type="submit"
            disabled={isLoading}
          >
            {type === 'sign-in' ? 'Sign In' : 'Sign Up'}

            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="loader"
                width={20}
                height={20}
                className="ml-2 animate-spin"
              />
            )}
          </Button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="body-2 justify-center flex">
            <p className="text-light-100">
              {type === 'sign-in'
                ? 'Don’t have an account?'
                : 'Already have an account?'}
            </p>
            <Link
              rel="stylesheet"
              href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
              className="ml-1 text-brand font-medium"
            >
              {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
            </Link>
          </div>
        </form>
      </Form>
      {/* OTP VERIFICATION */}
    </>
  );
};

export default AuthForm;
