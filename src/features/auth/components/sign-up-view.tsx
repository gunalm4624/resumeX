'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';
// @ts-expect-error - Module may not be found in some environments
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUpViewPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push('/dashboard');
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
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
        <form className='w-full max-w-md space-y-4' onSubmit={handleSignUp}>
          <h1 className='text-4xl mb-3 tracking-tighter text-center'>Create Your Account</h1>
          <p className="text-gray-600 tracking-tighter text-center">Join now to refine your resume and shine.</p>
          <Label htmlFor="name" className='text-start mb-2 mt-8'>Name</Label>
          <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
          <Label htmlFor="email" className='text-start mb-2'>Email</Label>
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
            {loading ? 'Signing Up...' : <>Sign Up <ArrowRight strokeWidth={2} /></>}
          </Button>
          <div className="flex items-center gap-4 my-2">
            <div className="flex-grow h-px bg-gray-300"></div>
            <p className="text-gray-600 text-sm mb-0 text-xs">Or Quickly Continue With</p>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
          <Button type="button" onClick={handleGoogleSignUp} className={'w-full mt-4 py-6 rounded-md stroke-button'} disabled={loading}>
            <img src='/assets/google-logo.svg' className='w-5'/> Sign up with Google
          </Button>
          <Button type="button" className={'w-full mt-1 py-6 rounded-md stroke-button'} disabled={loading}>
            <img src='/assets/Linkedin_icon.svg' className='w-5'/> Signin with Linkedin
          </Button>
          <div className="flex justify-center items-center mb-1 gap-2 text-sm mt-3">
            Already have an account?
            <a href="/auth/sign-in" className="link-primary font-medium tracking-tighter">
              Sign In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
