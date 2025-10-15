import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PageContainer({
  children,
  scrollable = true
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className='h-[calc(100dvh-52px)] min-h-[100%]'>
          <div className='flex flex-1 p-4 md:px-4 mx-2 mb-2 bg-white rounded-[12px] h-full min-h-full'>{children}</div>
        </ScrollArea>
      ) : (
        <div className='flex flex-1 p-4 md:px-4 mx-2 mb-2 bg-white rounded-[12px] h-[calc(100dvh-52px)]'>{children}</div>
      )}
    </>
  );
}
