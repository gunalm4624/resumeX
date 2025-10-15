import React from 'react';
import { SparklesText } from './ui/sparkles-text';

export default function ComingSoon({
  description = 'This feature is on the way. Thanks for your patience!'
}: {
  description?: string;
}) {
  return (
   <div className='flex h-full min-h-[calc(100dvh-52px)] w-full items-center justify-center text-center'>
     <SparklesText text="Coming soon" />
   </div>
  );
}


