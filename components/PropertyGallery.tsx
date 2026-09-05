"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const list = images.length ? images : ["/works/lavori2.jpg"];

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => {
            setIndex(0);
            setOpen(true);
          }}
          className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-2xl"
        >
          <Image src={list[0]} alt={title} fill priority className="object-cover" />
        </button>
        {list.slice(1, 3).map((img, i) => (
          <button
            key={img}
            onClick={() => {
              setIndex(i + 1);
              setOpen(true);
            }}
            className="relative aspect-[16/9] overflow-hidden rounded-2xl"
          >
            <Image src={img} alt={title} fill className="object-cover" />
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-90 flex items-center justify-center bg-night/90 backdrop-blur"
          onClick={() => setOpen(false)}
        >
          <button className="absolute right-5 top-5 rounded-full bg-panel p-2 text-white" onClick={() => setOpen(false)} aria-label="Chiudi">
            <X size={22} />
          </button>
          <button
            className="absolute left-5 rounded-full bg-panel p-2 text-white"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((index - 1 + list.length) % list.length);
            }}
            aria-label="Precedente"
          >
            <ChevronLeft size={26} />
          </button>
          <div className="relative h-[80vh] w-[90vw] max-w-5xl">
            <Image src={list[index]} alt={title} fill className="object-contain" />
          </div>
          <button
            className="absolute right-5 rounded-full bg-panel p-2 text-white"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((index + 1) % list.length);
            }}
            aria-label="Successiva"
          >
            <ChevronRight size={26} />
          </button>
          <span className="absolute bottom-6 rounded-full bg-panel px-3 py-1 text-sm text-slate-300">
            {index + 1} / {list.length}
          </span>
        </div>
      )}
    </>
  );
}
