"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
type CarouselProps = React.ComponentProps<"div"> & { slides: React.ReactNode[]; defaultIndex?: number; onSlideChange?: (index: number) => void };
export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(({ className, defaultIndex = 0, onSlideChange, slides, ...props }, ref) => { const [index, setIndex] = React.useState(defaultIndex); const changeSlide = (nextIndex: number) => { setIndex(nextIndex); onSlideChange?.(nextIndex); }; return <div ref={ref} data-slot="carousel" className={cn("carousel", className)} {...props}><div className="carousel-viewport"><div className="carousel-track" style={{ transform:`translateX(-${index * 100}%)` }}>{slides}</div></div><div className="carousel-controls">{slides.map((_, slideIndex) => <button key={slideIndex} type="button" aria-label={`Show slide ${slideIndex + 1}`} aria-current={slideIndex === index} className={`carousel-dot ${slideIndex === index ? "active" : ""}`} onClick={() => changeSlide(slideIndex)} />)}</div></div>; });
Carousel.displayName = "Carousel";
