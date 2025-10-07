"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    async function run() {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.replace('/auth/sign-in');
      } else {
        router.replace('/dashboard/overview');
      }
    }
    run();
  }, [router]);

  return null;
}
