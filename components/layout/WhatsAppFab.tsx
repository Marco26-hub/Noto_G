"use client";

import { motion } from "framer-motion";
import { waLink } from "@/lib/site";
import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  return (
    <motion.a
      href={waLink("Ciao Noto G! Vorrei prenotare un appuntamento.")}
      target="_blank"
      rel="noopener"
      aria-label="Prenota su WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.4, type: "spring" }}
      className="pulse-wa fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent-green text-white shadow-xl md:h-15 md:w-15"
    >
      <MessageCircle className="h-7 w-7" />
    </motion.a>
  );
}
