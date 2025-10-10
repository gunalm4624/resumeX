'use client';

import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';

function Switch({
  className,
  checked,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  const isChecked = Boolean(checked);

  const base = 'peer data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50';
  const checkedClasses = 'data-[state=checked]:bg-gradient-to-b data-[state=checked]:from-[#9342FF] data-[state=checked]:to-[#4A00AE]';

  return (
    <SwitchPrimitive.Root
      data-slot='switch'
      checked={checked}
      className={cn(base, checkedClasses, className, isChecked ? 'data-[state=checked]:bg-gradient-to-b' : '')}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot='switch-thumb'
        className={cn(
          'bg-background data-[state=checked]:bg-white pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0'
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
