import React from 'react';
import { supabase } from '@/lib/supabaseClient';
import { UserAvatarProfile } from '@/components/user-avatar-profile';

export default function ProfileViewPage() {
  const [user, setUser] = React.useState<{
    imageUrl?: string;
    fullName?: string | null;
    emailAddresses: Array<{ emailAddress: string }>;
  } | null>(null);

  React.useEffect(() => {
    let isMounted = true;
    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      if (!isMounted) return;
      const u = data.user;
      if (u) {
        const imageUrl = (u.user_metadata && (u.user_metadata.avatar_url || u.user_metadata.picture)) || '';
        const fullName = (u.user_metadata && (u.user_metadata.full_name || u.user_metadata.name)) || '';
        const emailAddress = u.email || '';
        setUser({ imageUrl, fullName, emailAddresses: [{ emailAddress }] });
      } else {
        setUser(null);
      }
    }
    loadUser();
    const { data: sub } = supabase.auth.onAuthStateChange(() => loadUser());
    return () => {
      isMounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className='flex w-full flex-col p-4'>
      {user ? (
        <UserAvatarProfile className='h-16 w-16 rounded-lg' showInfo user={user} />
      ) : (
        <div>Not signed in</div>
      )}
    </div>
  );
}
