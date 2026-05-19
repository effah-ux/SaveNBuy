import { cn } from "./ui/utils";

interface ShowcaseSectionProps {
  children: React.ReactNode;
  className?: string;
}

/** Unified cream / soft-yellow backdrop for all product showcase blocks */
export function ShowcaseSection({ children, className }: ShowcaseSectionProps) {
  return (
    <section
      className={cn(
        "py-12 bg-gradient-to-br from-orange-50 to-yellow-50",
        className,
      )}
    >
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}
