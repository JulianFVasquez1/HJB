"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Carousel({ items }: { items: { image: string, title?: string }[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
    if (!emblaApi) return;
    autoplayTimerRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      resetAutoplay();
    }
  }, [emblaApi, resetAutoplay]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      resetAutoplay();
    }
  }, [emblaApi, resetAutoplay]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    const timeout = setTimeout(() => {
      onSelect();
    }, 0);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      clearTimeout(timeout);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    
    resetAutoplay();
    emblaApi.on("pointerDown", resetAutoplay);
    
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [emblaApi, resetAutoplay]);

  return (
    <div className="relative overflow-hidden w-full h-full" ref={emblaRef}>
      <div className="flex h-full touch-pan-y">
        {items.map((item, index) => (
          <div className="relative min-w-0 flex-[0_0_100%] h-full flex items-center justify-center" key={index}>
            <div
              className={cn(
                "w-[960px] max-w-[90%] h-[540px] max-h-[90%] bg-contain bg-no-repeat bg-center transition-opacity duration-1000",
                index === selectedIndex ? "opacity-100" : "opacity-0"
              )}
              style={{ backgroundImage: `url("${item.image}")` }}
            />
          </div>
        ))}
      </div>
      
      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-6 top-1/2 z-20 -translate-y-1/2 w-14 h-14 rounded-full bg-[color:var(--color-primary)]/90 text-white shadow-2xl shadow-[color:var(--color-primary)]/30 flex items-center justify-center transition-colors hover:bg-[color:var(--color-secondary)]"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-6 top-1/2 z-20 -translate-y-1/2 w-14 h-14 rounded-full bg-[color:var(--color-primary)]/90 text-white shadow-2xl shadow-[color:var(--color-primary)]/30 flex items-center justify-center transition-colors hover:bg-[color:var(--color-secondary)]"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === selectedIndex ? "bg-white w-8" : "bg-white/30"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
