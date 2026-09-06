"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";

const PLACEHOLDER = "/works/lavori2.jpg";

export function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const list = images.length ? images : [PLACEHOLDER];
  const hidden = Math.max(0, list.length - 3);

  const show = useCallback((start: number) => {
    setIndex(start);
    setOpen(true);
  }, []);

  const step = useCallback(
    (delta: number) => setIndex((current) => (current + delta + list.length) % list.length),
    [list.length]
  );

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  return (
    <>
      <div className="mb-8 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => show(0)}
          className="media-frame relative col-span-2 aspect-[16/9] overflow-hidden"
          aria-label={`Apri la galleria di ${title}`}
        >
          <Image src={list[0]} alt={title} fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
        </button>
        {list.slice(1, 3).map((img, i) => {
          const position = i + 1;
          const isLastTile = position === 2 && hidden > 0;
          return (
            <button
              type="button"
              key={`${img}-${position}`}
              onClick={() => show(position)}
              className="media-frame relative aspect-[16/9] overflow-hidden"
              aria-label={isLastTile ? `Vedi tutte le ${list.length} foto` : `Foto ${position + 1} di ${list.length}`}
            >
              <Image src={img} alt={title} fill sizes="(max-width: 1024px) 50vw, 30vw" className="object-cover" />
              {isLastTile && (
                <span className="absolute inset-0 flex items-center justify-center gap-2 bg-night/70 text-sm font-semibold text-white backdrop-blur-[2px]">
                  <Images size={16} /> +{hidden} foto
                </span>
              )}
            </button>
          );
        })}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-90 flex items-center justify-center bg-night/90 backdrop-blur"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Galleria ${title}`}
        >
          <button className="absolute right-5 top-5 rounded-md border border-line bg-panel p-2 text-white" onClick={() => setOpen(false)} aria-label="Chiudi">
            <X size={22} />
          </button>
          {list.length > 1 && (
            <button
              className="absolute left-5 rounded-md border border-line bg-panel p-2 text-white"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Precedente"
            >
              <ChevronLeft size={26} />
            </button>
          )}
          <div className="relative h-[80vh] w-[90vw] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image src={list[index]} alt={`${title} — foto ${index + 1}`} fill sizes="90vw" className="object-contain" />
          </div>
          {list.length > 1 && (
            <button
              className="absolute right-5 rounded-md border border-line bg-panel p-2 text-white"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Successiva"
            >
              <ChevronRight size={26} />
            </button>
          )}
          <span className="absolute bottom-6 rounded-full bg-panel px-3 py-1 text-sm text-slate-300">
            {index + 1} / {list.length}
          </span>
        </div>
      )}
    </>
  );
}
