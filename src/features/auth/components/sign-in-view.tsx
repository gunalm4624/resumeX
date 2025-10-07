'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function SignInViewPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log('SignIn response:', { data, error });
    const session = await supabase.auth.getSession();
    console.log('Client session after sign-in:', session);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push('/dashboard');
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    console.log('Google SignIn response:', { data, error });
    setLoading(false);
    if (error) setError(error.message);
  };

  return (
    <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 p-2'>
      <div className='bg-black relative overflow-hidden h-full flex-col text-white lg:flex dark:border-r rounded-xl'>
        <img src="/assets/Star-decor.svg" className='absolute top-[-60px] w-full filter blur-[30px]' alt="decor-image" />
        <img src="/assets/resumex-logo-white.svg" alt="" className="relative z-10 w-40 m-auto" />
        <h1 className='relative bottom-16 text-4xl text-center leading-12 tracking-tighter'>Rewrite your career<br />story in seconds</h1>
      </div>
      <div className='flex h-full items-center justify-center p-4 lg:p-8'>
        <form className='w-full max-w-md space-y-4' onSubmit={handleSignIn}>
          <h1 className='text-4xl mb-3 tracking-tighter text-center'>Welcome Back!</h1>
          <p className="text-gray-600 tracking-tighter text-center">Sign in to refine your resume and unlock better opportunities.</p>
          <Label htmlFor="email" className='text-start mb-2 mt-8'>Email</Label>
          <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <Label htmlFor="password" className='text-start mb-2'>Password</Label>
          <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <div className="flex justify-end mb-1">
            <a href="#" className="link-primary text-sm font-medium tracking-tighter">
              Forgot Password?
            </a>
          </div>
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          <Button type="submit" className={'w-full mt-4 py-6 rounded-md primary-btn'} disabled={loading}>
            {loading ? 'Signing In...' : <>Sign In <ArrowRight strokeWidth={2} /></>}
          </Button>
          <div className="flex items-center gap-4 my-2">
            <div className="flex-grow h-px bg-gray-300"></div>
            <p className="text-gray-600 text-sm mb-0 text-xs">Or Quickly Continue With</p>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
          <Button type="button" onClick={handleGoogleSignIn} className={'w-full mt-4 py-6 rounded-md stroke-button'} disabled={loading}>
            <img src='/assets/google-logo.svg' className='w-5'/> Signin with Google
          </Button>
          <Button type="button" onClick={handleGoogleSignIn} className={'w-full mt-1 py-6 rounded-md stroke-button'} disabled={loading}>
            <img src='/assets/Linkedin_icon.svg' className='w-5'/> Signin with Linkedin
          </Button>
          <div className="flex justify-center items-center mb-1 gap-2 text-sm mt-3">
            Don’t have an account?
            <a href="/auth/sign-up" className="link-primary font-medium tracking-tighter">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
