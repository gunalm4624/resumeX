'use client';

import React from 'react';
import {
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import Link from 'next/link';

interface MenuItemProps {
  title: string;
  url?: string;
  icon?: React.ComponentType;
  isActive?: boolean;
}

export const MenuItem = React.memo(({ title, url, icon: Icon, isActive }: MenuItemProps) => {
  if (!url) return null;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link href={url}>
          {Icon && <Icon />}
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
});

MenuItem.displayName = 'MenuItem';