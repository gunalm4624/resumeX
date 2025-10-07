'use client'; // This makes the page render on client-side

import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter,
  CardContent
} from '@/components/ui/card';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import React from 'react';
import { ResumeHistoryTable } from '@/features/overview/components/resume-history';

export default function OverViewLayout({
  pie_stats,
  area_stats
}: {
  pie_stats: React.ReactNode;
  area_stats: React.ReactNode;
}) {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-xl font-semibold tracking-tight mb-0'>
            Dashboard
          </h2>
          <button className='py-2 text-sm primary-btn px-6'>Create Resume</button>
        </div>

		{/* Summary cards row (not charts) */}
		<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
			<Card className='@container/card card-bg-gradient relative'>
      <img src="/assets/light-ray.svg" className='absolute top-0 right-0 filter blur-[18px]' alt="" />
				<CardHeader>
					<CardTitle className='text-base font-medium'>Resumes Created</CardTitle>
				</CardHeader>
        <CardContent>
          <h1 className='text-4xl font-semibold'>3</h1>
        </CardContent>
        <CardFooter>
          <p className='text-sm'>Resumes built from scratch</p>
        </CardFooter>
			</Card>
			<Card className='@container/card'>
				<CardHeader>
					<CardTitle className='text-base font-medium'>Resumes Rewritten</CardTitle>
				</CardHeader>
        <CardContent>
          <h1 className='text-4xl font-semibold'>12</h1>
        </CardContent>
        <CardFooter>
          <p className='text-sm text-gray-500'>Resumes rewritten based on JD</p>
        </CardFooter>
			</Card>
			<Card className='@container/card'>
				<CardHeader>
					<CardTitle className='text-base font-medium'>ATS Checks Performed</CardTitle>
				</CardHeader>
        <CardContent>
          <h1 className='text-4xl font-semibold'>27</h1>
        </CardContent>
        <CardFooter>
          <p className='text-sm text-gray-500'>Resumes you tested for ATS</p>
        </CardFooter>
			</Card>
			<Card className='@container/card'>
				<CardHeader>
					<CardTitle className='text-base font-medium'>Improvement Rate</CardTitle>
				</CardHeader>
        <CardContent>
          <h1 className='text-4xl font-semibold'>18%</h1>
        </CardContent>
        <CardFooter>
          <p className='text-sm text-gray-500'>Improved as per latest checks</p>
        </CardFooter>
			</Card>
			
		</div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <div className='col-span-4'>{area_stats}</div>
          <div className='col-span-4 md:col-span-3'>{pie_stats}</div>
        </div>

		{/* Resume History Table */}
		<ResumeHistoryTable />
      </div>
    </PageContainer>
  );
}
