'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import type { IconProps } from '@tabler/icons-react';
import type { ComponentType } from 'react';

interface LoadingSpanProps {
  className?: string;
}

const LoadingSpan: React.FC<LoadingSpanProps> = () => (
  <span className="w-4 h-4 block" />
);

const LoadingChart: React.FC = () => (
  <div className="animate-pulse bg-gray-200 rounded h-[300px]" />
);

// Lazy-loaded icons
export const DynamicIcons = {
  TrendingUp: dynamic<IconProps>(() =>
    import('@tabler/icons-react').then(mod => mod.IconTrendingUp), {
    ssr: false,
    loading: () => <LoadingSpan />
  }),
  TrendingDown: dynamic<IconProps>(() =>
    import('@tabler/icons-react').then(mod => mod.IconTrendingDown), {
    ssr: false,
    loading: () => <LoadingSpan />
  })
};

// Lazy-loaded charts
export const DynamicCharts = {
  AreaGraph: dynamic(() =>
    import('../features/overview/components/area-graph').then(mod => mod.AreaGraph), {
    ssr: false,
    loading: () => <LoadingChart />
  }),
  PieGraph: dynamic(() =>
    import('../features/overview/components/pie-graph').then(mod => mod.PieGraph), {
    ssr: false,
    loading: () => <LoadingChart />
  })
};