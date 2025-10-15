import React from 'react';

export default function ComingSoon({
  description = 'This feature is on the way. Thanks for your patience!'
}: {
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center border rounded-lg">
      <div className="text-2xl font-semibold">Coming soon</div>
      <p className="text-muted-foreground max-w-xl">{description}</p>
    </div>
  );
}


