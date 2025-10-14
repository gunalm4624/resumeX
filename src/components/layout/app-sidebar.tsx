'use client';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarSeparator,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from '@/components/ui/sidebar';
import { UserAvatarProfile } from '@/components/user-avatar-profile';
import { navItems } from '@/constants/data';
import { useMediaQuery } from '@/hooks/use-media-query';
import { supabase } from '@/lib/supabaseClient';
import dynamic from 'next/dynamic';

const IconBell = dynamic(() => import('@tabler/icons-react').then(mod => mod.IconBell), { ssr: false });
const IconChevronRight = dynamic(() => import('@tabler/icons-react').then(mod => mod.IconChevronRight), { ssr: false });
const IconChevronsDown = dynamic(() => import('@tabler/icons-react').then(mod => mod.IconChevronsDown), { ssr: false });
const IconCreditCard = dynamic(() => import('@tabler/icons-react').then(mod => mod.IconCreditCard), { ssr: false });
const IconLogout = dynamic(() => import('@tabler/icons-react').then(mod => mod.IconLogout), { ssr: false });
const IconPhotoUp = dynamic(() => import('@tabler/icons-react').then(mod => mod.IconPhotoUp), { ssr: false });
const IconUserCircle = dynamic(() => import('@tabler/icons-react').then(mod => mod.IconUserCircle), { ssr: false });
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { Icons } from '../icons';
import { OrgSwitcher } from '../org-switcher';
export const company = {
  name: 'Acme Inc',
  logo: IconPhotoUp,
  plan: 'Enterprise'
};

const tenants = [
  { id: '1', name: 'Acme Inc' },
  { id: '2', name: 'Beta Corp' },
  { id: '3', name: 'Gamma Ltd' }
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { isOpen } = useMediaQuery();
  const [user, setUser] = React.useState<{
    imageUrl?: string;
    fullName?: string | null;
    emailAddresses: Array<{ emailAddress: string }>;
  } | null>(null);
  const router = useRouter();
  const handleSwitchTenant = (_tenantId: string) => {
    // Tenant switching functionality would be implemented here
  };

  const activeTenant = tenants[0];

  React.useEffect(() => {
    // Side effects based on sidebar state changes
  }, [isOpen]);

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
        setUser({
          imageUrl,
          fullName,
          emailAddresses: [{ emailAddress }]
        });
      } else {
        setUser(null);
      }
    }
    loadUser();
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      loadUser();
    });
    return () => {
      isMounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return (
    <Sidebar collapsible='icon' className='overflow-hidden'>
      <SidebarHeader>
        <div className='p-2'>
            <img src="/assets/resumex-logo-white.svg" alt="logo" className='w-25 h-10' />
        </div>
      <SidebarSeparator className='mx-auto' />

  <SidebarMenu className='flex flex-col space-y-2'>
          {/* <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size='lg'
                  className='linear-bg data-[state=open]:bg-sidebar-accent active:bg-white/10 !text-white !active:text-white !focus:text-white !focus-visible:text-white'
                >
                  {user && (
                    <UserAvatarProfile
                      className='h-8 w-8 rounded-lg'
                      showInfo
                      user={user}
                    />
                  )}
                  <IconChevronsDown className='ml-auto size-4' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg bg-white text-popover-foreground border border-sidebar-border shadow-sm'
                side='bottom'
                align='end'
                sideOffset={4}
              >
                <DropdownMenuLabel className='p-0 font-normal'>
                  <div className='px-1 py-1.5'>
                    {user && (
                      <UserAvatarProfile
                        className='h-8 w-8 rounded-lg'
                        showInfo
                        user={user}
                      />
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup className='text-black'>
                  <DropdownMenuItem
                    onClick={() => router.push('/dashboard/profile')}
                  >
                    <IconUserCircle className='mr-2 h-4 w-4' />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconCreditCard className='mr-2 h-4 w-4' />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconBell className='mr-2 h-4 w-4' />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <button
                    className='flex w-full items-center'
                    onClick={async () => {
                      await supabase.auth.signOut();
                      router.replace('/auth/sign-in');
                    }}
                  >
                    <IconLogout className='mr-2 h-4 w-4' />
                    Sign out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem> */}
        </SidebarMenu>
                    {/* <SidebarSeparator className='mx-auto mt-2' /> */}

      </SidebarHeader>

      <SidebarContent className='overflow-x-hidden'>
        <SidebarGroup>
          <SidebarMenu className='flex flex-col space-y-2'>
            {navItems.map((item) => {
              const Icon = item.icon ? Icons[item.icon] : Icons.logo;
              return item?.items && item?.items?.length > 0 ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className='group/collapsible'
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={pathname === item.url}
                        className='hover:bg-transparent active:bg-transparent data-[active=true]:bg-transparent'
                      >
                        {item.icon ? (
                          <div
                            className='w-6 h-6 flex items-center justify-center rounded-lg overflow-hidden'
                            style={{
                              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.00) 100%)',
                            }}
                          >
                            <Icon className='w-6 h-6' />
                          </div>
                        ) : (
                          <Icon className='w-6 h-6' />
                        )}
                        <span>{item.title}</span>
                        <IconChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub className='flex flex-col space-y-1'>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname === subItem.url}
                              className='hover:bg-transparent active:bg-transparent data-[active=true]:bg-transparent'
                            >
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      {item.icon ? (
                        <div
                          className='w-8 h-8 flex items-center justify-center rounded-sm'
                          style={{
                            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.00) 100%)'
                          }}
                        >
                          <Icon className='w-5 h-5' />
                        </div>
                      ) : (
                        <Icon className='w-6 h-6' />
                      )}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='mt-auto mb-4 px-2 mx-auto relative'>
        <div className='bg-white h-30 w-100 absolute z-10 bottom-12 left-0 right-0 mx-auto'></div>
      </SidebarFooter>
      <SidebarRail />
              <img src="/assets/Star-decor-bottom.svg" className='absolute bottom-[-40px] w-full filter blur-[16px]' alt="decor-image" />
    </Sidebar>
  );
}
