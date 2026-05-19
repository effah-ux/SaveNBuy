import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Product } from "./ProductGrid";
import { cn } from "./ui/utils";

const SLIDE_INTERVAL_MS = 4500;
const FADE_DURATION_MS = 900;
const THEME_TRANSITION_MS = 700;

interface HeroSlide extends Product {
  gradientFrom: string;
  gradientTo: string;
  /** Optional radial highlight (rgba) layered on the linear gradient */
  gradientAccent?: string;
}

const HERO_SLIDES: HeroSlide[] = [
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
    gradientFrom: "#1A1A2E",
    gradientTo: "#4B134F",
    gradientAccent: "rgba(120, 40, 90, 0.35)",
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
    gradientFrom: "#0C1929",
    gradientTo: "#0369A1",
    gradientAccent: "rgba(56, 189, 248, 0.28)",
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
    gradientFrom: "#701A3C",
    gradientTo: "#DB2777",
    gradientAccent: "rgba(251, 191, 36, 0.22)",
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
    gradientFrom: "#7C2D12",
    gradientTo: "#EA580C",
    gradientAccent: "rgba(251, 146, 60, 0.3)",
  },
];

function heroSlideBackground(slide: HeroSlide): string {
  const linear = `linear-gradient(128deg, ${slide.gradientFrom} 0%, ${slide.gradientTo} 100%)`;
  if (!slide.gradientAccent) return linear;
  return `${linear}, radial-gradient(ellipse 100% 85% at 25% 15%, ${slide.gradientAccent}, transparent 58%)`;
}

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

function DynamicThemeBackground({
  activeIndex,
  className,
}: {
  activeIndex: number;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0", className)} aria-hidden="true">
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity ease-in-out",
            index === activeIndex ? "opacity-100" : "opacity-0",
          )}
          style={{
            background: heroSlideBackground(slide),
            transitionDuration: `${THEME_TRANSITION_MS}ms`,
          }}
        />
      ))}
    </div>
  );
}

function StarRating() {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="size-3.5 sm:size-4 fill-emerald-400 text-emerald-400 drop-shadow-sm"
            strokeWidth={0}
          />
        ))}
      </span>
      <span className="text-xs sm:text-sm font-medium tracking-wide text-white font-sans [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]">
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
      <DynamicThemeBackground activeIndex={activeIndex} />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.06)_0%,transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-black/20" />

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
          <p className="text-base font-semibold tracking-tight text-white sm:text-lg font-sans [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
            {displayName}
          </p>
          <p className="mt-1 text-xl font-bold tracking-tight text-white tabular-nums sm:text-2xl [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
            <span className="text-amber-200">{formatGhs(activeSlide.price)}</span>
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
    <section className="relative overflow-hidden transition-colors duration-700 ease-in-out">
      <DynamicThemeBackground activeIndex={activeIndex} />
      <div className="pointer-events-none absolute inset-0 bg-black/25" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(0,0,0,0.35)_0%,transparent_42%,rgba(0,0,0,0.12)_100%)]" />

      <div className="container relative z-10 mx-auto px-4 py-10 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div className="mx-auto flex w-full max-w-xl flex-col items-start rounded-2xl text-left text-white lg:mx-0 lg:bg-black/20 lg:p-6 lg:backdrop-blur-[2px]">
            <StarRating />

            <h1
              className={cn(
                "mt-5 font-serif text-4xl font-semibold tracking-tight text-white sm:mt-6 sm:text-5xl lg:text-[3.25rem] xl:text-6xl",
                "leading-[1.1] [text-shadow:0_2px_12px_rgba(0,0,0,0.55)]",
              )}
            >
              <span className="block">Akwaaba Sale</span>
              <span className="mt-1 block">Up to 60% Off</span>
            </h1>

            <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-white sm:mt-5 sm:text-base [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]">
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
                "shadow-lg shadow-black/30 ring-1 ring-white/20",
              )}
            >
              BUY NOW
            </Button>

            <p className="mt-3 font-sans text-xs text-white/95 sm:text-sm [text-shadow:0_1px_6px_rgba(0,0,0,0.4)]">
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
