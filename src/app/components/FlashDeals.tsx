import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { ProductGrid, Product } from "./ProductGrid";

interface FlashDealsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

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

  return (
    <section className="py-12 bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl md:text-3xl font-bold">⚡ Flash Deals</h2>
              <Badge className="bg-red-500 text-white">Hot</Badge>
            </div>
            <p className="text-gray-600">Limited time offers - Don't miss out!</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-md min-w-[300px]">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">Ends in:</span>
              <span className="font-bold text-orange-500">
                {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
            <div className="space-y-2">
              <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full transition-all duration-1000"
                  style={{
                    width: `${((timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds) / (24 * 3600)) * 100}%`
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
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
