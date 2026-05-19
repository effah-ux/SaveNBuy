import { cn } from "./ui/utils";
import { MAIN_CONTAINER_CLASS } from "../lib/layout";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn(MAIN_CONTAINER_CLASS, className)}>{children}</div>
  );
}
