import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    (<div
      className={cn("animate-spin rounded-md bg-primary/10", className)}
      {...props} />)
  );
}

export { Skeleton }
