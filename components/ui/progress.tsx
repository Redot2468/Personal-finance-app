"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import { cn } from "@/lib/utils";

interface CustomProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number;
  budgetColorTag?: string | undefined;
}

function Progress({
  className,
  value,

  max,
  budgetColorTag,
  ...props
}: CustomProgressProps) {
  const percentage = Math.min(((value ?? 0) / (max ?? 0)) * 100, 100);
  return (
    <div className="bg-beige-100 relative h-8 w-full overflow-hidden rounded-sm px-1 py-1">
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(
          "bg-beige-100 relative flex h-6 w-full items-center gap-1 overflow-hidden rounded-sm",
          className,
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={`${budgetColorTag} h-full w-full flex-1 transition-all`}
          style={{
            transform: `translateX(-${100 - percentage}%)`,
          }}
        />
      </ProgressPrimitive.Root>
    </div>
  );
}

export { Progress };
