import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Product } from "./ProductGrid";
import { cn } from "./ui/utils";

const SLIDE_INTERVAL_MS = 4500;
const FADE_DURATION_MS = 900;

const HERO_SLIDES: Product[] = [
  {
    id: 101,
    name: "Luxury Analog Watch - Premium Stainless Steel",
    price: 150.0,
    originalPrice: 299.0,
    rating: 4.6,
    reviews: 987,
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    badge: "Akwaaba",
  },
  {
    id: 102,
    name: "Wireless Bluetooth Earbuds Pro - Premium Sound",
    price: 79.99,
    originalPrice: 149.99,
    rating: 4.5,
    reviews: 2341,
    image:
      "https://images.unsplash.com/photo-1620783770629-122b7f187703?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    badge: "Akwaaba",
  },
  {
    id: 103,
    name: "Beauty Cosmetics Set - Complete Makeup Kit",
    price: 58.77,
    originalPrice: 119.99,
    rating: 4.9,
    reviews: 4521,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    badge: "Akwaaba",
  },
  {
    id: 104,
    name: "Fashion Clothing Bundle - Trendy Outfit Set",
    price: 145.99,
    originalPrice: 249.99,
    rating: 4.6,
    reviews: 2134,
    image:
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    badge: "Akwaaba",
  },
];

const HERO_DISPLAY_NAMES: Record<number, string> = {
  101: "The Watch",
  102: "Wireless Earbuds",
  103: "Makeup Kit",
  104: "Trendy Outfits",
};

function formatGhs(amount: number): string {
  return `GH₵ ${amount.toLocaleString("en-GH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function StarRating() {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="size-3.5 sm:size-4 fill-emerald-400 text-emerald-400"
            strokeWidth={0}
          />
        ))}
      </span>
      <span className="text-xs sm:text-sm text-white/95 font-medium tracking-wide font-sans">
        4.6/5 | 225,000+ Happy Customers in Ghana
      </span>
    </div>
  );
}

interface HeroProductSliderProps {
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  isPaused: boolean;
  onPausedChange: (paused: boolean) => void;
}

function HeroProductSlider({
  activeIndex,
  onActiveIndexChange,
  isPaused,
  onPausedChange,
}: HeroProductSliderProps) {
  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      onActiveIndexChange((activeIndex + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [activeIndex, isPaused, onActiveIndexChange]);

  const activeSlide = HERO_SLIDES[activeIndex];
  const displayName =
    HERO_DISPLAY_NAMES[activeSlide.id] ?? activeSlide.name;

  return (
    <div
      className={cn(
        "relative flex w-full flex-col overflow-hidden rounded-2xl sm:rounded-3xl",
        "min-h-[360px] sm:min-h-[420px] lg:min-h-[480px]",
        "bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,rgba(255,140,0,0.45),transparent_55%),radial-gradient(ellipse_70%_55%_at_90%_100%,rgba(236,72,153,0.5),transparent_50%),linear-gradient(145deg,#2a1408_0%,#1a0a12_45%,#2d1020_100%)]",
        "shadow-[0_24px_60px_-12px_rgba(0,0,0,0.45)]",
        "ring-1 ring-white/10",
      )}
      tabIndex={0}
      onMouseEnter={() => onPausedChange(true)}
      onMouseLeave={() => onPausedChange(false)}
      onFocusCapture={() => onPausedChange(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          onPausedChange(false);
        }
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.06)_0%,transparent_40%)]" />

      <div className="relative flex min-h-[inherit] flex-1 flex-col">
        <div className="relative flex-1 w-full min-h-[240px] sm:min-h-[280px] lg:min-h-[320px]">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === activeIndex;
            const slideLabel = HERO_DISPLAY_NAMES[slide.id] ?? slide.name;
            return (
              <div
                key={slide.id}
                className={cn(
                  "absolute inset-0 transition-opacity ease-in-out",
                  isActive ? "z-10 opacity-100" : "z-0 opacity-0 pointer-events-none",
                )}
                style={{ transitionDuration: `${FADE_DURATION_MS}ms` }}
                aria-hidden={!isActive}
              >
                <ImageWithFallback
                  src={slide.image}
                  alt={slideLabel}
                  className="h-full w-full object-cover object-center drop-shadow-[0_16px_32px_rgba(0,0,0,0.4)]"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              </div>
            );
          })}
        </div>

        <div
          className="relative z-20 shrink-0 px-5 pb-3 pt-4 text-center sm:px-8"
          style={{ transitionDuration: `${FADE_DURATION_MS}ms` }}
        >
          <p className="text-base font-semibold tracking-tight text-white sm:text-lg font-sans">
            {displayName}
          </p>
          <p className="mt-1 text-xl font-bold tracking-tight text-white tabular-nums sm:text-2xl">
            <span className="text-orange-300">{formatGhs(activeSlide.price)}</span>
          </p>
        </div>

        <div className="relative z-20 flex shrink-0 items-center justify-center gap-2 pb-5">
          {HERO_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => onActiveIndexChange(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === activeIndex
                  ? "w-7 bg-white"
                  : "w-1.5 bg-white/35 hover:bg-white/55",
              )}
              aria-label={`Show ${HERO_DISPLAY_NAMES[slide.id] ?? slide.name}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>

        {isPaused && (
          <p className="absolute right-3 top-3 rounded-full bg-black/30 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/70 backdrop-blur-sm">
            Paused
          </p>
        )}
      </div>
    </div>
  );
}

interface HeroSectionProps {
  onAddToCart: (product: Product) => void;
}

export function HeroSection({ onAddToCart }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeProduct = HERO_SLIDES[activeIndex];

  const handleBuyNow = () => {
    onAddToCart(activeProduct);
  };

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        "bg-[radial-gradient(ellipse_120%_90%_at_0%_30%,#c2410c_0%,transparent_52%),radial-gradient(ellipse_100%_80%_at_100%_0%,#be185d_0%,transparent_48%),radial-gradient(ellipse_90%_70%_at_60%_100%,#7f1d1d_0%,transparent_55%),linear-gradient(128deg,#9a3412_0%,#9d174d_38%,#701a3c_68%,#3b0f1f_100%)]",
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_20%,rgba(255,200,120,0.18),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_80%,rgba(244,114,182,0.12),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-black/10" />

      <div className="container relative mx-auto px-4 py-10 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div className="mx-auto flex w-full max-w-xl flex-col items-start text-left text-white lg:mx-0">
            <StarRating />

            <h1
              className={cn(
                "mt-5 font-serif text-4xl font-semibold tracking-tight text-white sm:mt-6 sm:text-5xl lg:text-[3.25rem] xl:text-6xl",
                "leading-[1.1]",
              )}
            >
              <span className="block">Akwaaba Sale</span>
              <span className="mt-1 block">Up to 60% Off</span>
            </h1>

            <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-white/90 sm:mt-5 sm:text-base">
              Best Deals in Accra. No.1 rated online marketplace for quality
              products delivered fast in Ghana.
            </p>

            <Button
              type="button"
              onClick={handleBuyNow}
              className={cn(
                "mt-7 h-12 rounded-lg px-10 sm:mt-8",
                "bg-white text-gray-900 hover:bg-white/95",
                "font-sans text-sm font-bold tracking-[0.12em] sm:text-base",
                "shadow-lg shadow-black/20",
              )}
            >
              BUY NOW
            </Button>

            <p className="mt-3 font-sans text-xs text-white/80 sm:text-sm">
              Free delivery on orders over {formatGhs(150)}
            </p>
          </div>

          <div className="mx-auto w-full max-w-lg lg:ml-auto lg:max-w-none">
            <HeroProductSlider
              activeIndex={activeIndex}
              onActiveIndexChange={setActiveIndex}
              isPaused={isPaused}
              onPausedChange={setIsPaused}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
