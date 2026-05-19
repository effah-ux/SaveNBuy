import { Badge } from "./ui/badge";
import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { ProductGrid, Product } from "./ProductGrid";

interface FlashDealsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const TOTAL_SECONDS = 12 * 3600 + 34 * 60 + 56;

export function FlashDeals({ products, onAddToCart }: FlashDealsProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 34,
    seconds: 56,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const remainingSeconds =
    timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds;
  const progressPercent = (remainingSeconds / TOTAL_SECONDS) * 100;

  return (
    <section className="bg-[#FFF5F5] py-12">
      <div className="container mx-auto px-4">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-6">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-950 md:text-3xl">
              ⚡ Flash Deals
            </h2>
            <Badge className="rounded-full border-0 bg-orange-600 px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm hover:bg-orange-600">
              Flash Sale
            </Badge>
          </div>
          <p className="mt-2 text-sm text-neutral-500 md:text-base">
            Limited time offers - Don&apos;t miss out!
          </p>
        </div>

        <div className="w-full min-w-[340px] max-w-[440px] shrink-0 rounded-lg border border-orange-100/80 bg-white px-6 py-2.5 shadow-md sm:min-w-[400px]">
          <div className="mb-1.5 flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0 text-orange-500" />
            <span className="text-xs font-medium text-gray-600">Ends in:</span>
            <span className="text-sm font-bold tabular-nums text-orange-600">
              {String(timeLeft.hours).padStart(2, "0")}:
              {String(timeLeft.minutes).padStart(2, "0")}:
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </div>
          <div className="w-full">
            <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 via-red-500 to-rose-600 transition-all duration-1000"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="mt-1 flex justify-between text-[10px] font-medium text-gray-500">
              <span>{String(timeLeft.hours).padStart(2, "0")}h</span>
              <span>{String(timeLeft.minutes).padStart(2, "0")}m</span>
              <span>{String(timeLeft.seconds).padStart(2, "0")}s</span>
            </div>
          </div>
        </div>
      </div>

      <ProductGrid products={products} onAddToCart={onAddToCart} />
      </div>
    </section>
  );
}
