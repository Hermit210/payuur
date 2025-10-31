import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../utils/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border-3d px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-all overflow-hidden bg-3d-secondary shadow-3d text-3d",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-white/10 to-white/5 text-white border-white/20 [a&]:hover:from-white/20 [a&]:hover:to-white/10",
        secondary:
          "bg-gradient-to-br from-gray-700/50 to-gray-800/50 text-gray-200 border-gray-600/30 [a&]:hover:from-gray-600/50 [a&]:hover:to-gray-700/50",
        destructive:
          "bg-gradient-to-br from-red-600/50 to-red-700/50 text-red-200 border-red-500/30 [a&]:hover:from-red-500/50 [a&]:hover:to-red-600/50",
        outline:
          "bg-transparent text-white border-white/30 [a&]:hover:bg-white/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
