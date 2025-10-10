'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// Dynamically import heavy components
const AreaGraph = dynamic(() => import('@/features/overview/components/area-graph').then(mod => mod.AreaGraph), {
  ssr: false,
  loading: () => <div className="h-[300px] animate-pulse bg-gray-100 rounded-lg" />
});

const PieGraph = dynamic(() => import('@/features/overview/components/pie-graph').then(mod => mod.PieGraph), {
  ssr: false,
  loading: () => <div className="h-[300px] animate-pulse bg-gray-100 rounded-lg" />
});

const IconTrendingUp = dynamic(() => 
  import('@tabler/icons-react').then(mod => mod.IconTrendingUp), { ssr: false }
);

const IconTrendingDown = dynamic(() => 
  import('@tabler/icons-react').then(mod => mod.IconTrendingDown), { ssr: false }
);

export default function OverviewPage() {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Hi, Welcome back 👋
          </h2>
          <div className='hidden items-center space-x-2 md:flex'>
            <Button>Download</Button>
          </div>
        </div>
        
        <Tabs defaultValue='overview' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='analytics'>Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader>
                  <CardTitle>ATS Score</CardTitle>
                  <CardDescription>Average score across all resumes</CardDescription>
                </CardHeader>
                <CardFooter className='flex justify-between'>
                  <div className='text-2xl font-bold'>85%</div>
                  <Badge variant='secondary'>
                    <IconTrendingUp className='mr-1' />
                    +2.5%
                  </Badge>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Applications</CardTitle>
                  <CardDescription>Total job applications</CardDescription>
                </CardHeader>
                <CardFooter className='flex justify-between'>
                  <div className='text-2xl font-bold'>24</div>
                  <Badge variant='secondary'>
                    <IconTrendingUp className='mr-1' />
                    +12
                  </Badge>
                </CardFooter>
              </Card>
            </div>

            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
              <Card className='col-span-4'>
                <CardHeader>
                  <CardTitle>Application Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <AreaGraph />
                </CardContent>
              </Card>

              <Card className='col-span-3'>
                <CardHeader>
                  <CardTitle>Resume Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <PieGraph />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value='analytics'>
            {/* Add analytics content here */}
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}