'use client';

import { useMemo } from 'react';
import { navItems } from '@/constants/data';

export const useMenuItems = (pathname: string) => {
  return useMemo(() => {
    return navItems.map(item => ({
      ...item,
      isActive: pathname === item.url || (item.items?.some(subItem => pathname === subItem.url))
    }));
  }, [pathname]);
};