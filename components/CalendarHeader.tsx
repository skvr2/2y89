"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { formatPolishDate, getWeekDays, todayISO } from "@/lib/storage";

interface CalendarHeaderProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  dark?: boolean;
}

export function CalendarHeader({ selectedDate, onDateChange, dark = false }: CalendarHeaderProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const weekDays = getWeekDays(selectedDate);
  const today = todayISO();

  const handleShift = (offset: number) => {
    const parts = selectedDate.split("-");
    const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    d.setDate(d.getDate() + offset);
    onDateChange(todayISO(d));
  };

  return (
    <header className={`pt-[max(12px,env(safe-area-inset-top))] px-4 pb-3 transition-colors ${dark ? "bg-zinc-950" : "bg-white"}`}>
      {/* Brand Bar with Mascot Logo */}
      <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-gray-100 dark:border-zinc-800/60">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icon-192.png"
            alt="Kalorix Logo"
            className="h-7 w-7 rounded-xl object-contain shadow-sm border border-emerald-500/20 bg-emerald-500/5 p-0.5"
          />
          <div className="flex items-center gap-1.5">
            <span className="text-[17px] font-black tracking-tight bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
              Kalorix
            </span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${dark ? "bg-zinc-800 text-zinc-400" : "bg-gray-100 text-gray-500"}`}>
              v2.0
            </span>
          </div>
        </div>
        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${dark ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-emerald-50 text-emerald-600 border border-emerald-200"}`}>
          Fitatu AI
        </span>
      </div>

      {/* Top Bar with Date Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => handleShift(-1)}
          className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
            dark ? "text-zinc-400 hover:bg-zinc-800 hover:text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
          aria-label="Poprzedni dzień"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
          >
            <CalendarIcon className="h-4 w-4 text-emerald-500" />
            <div className="text-center">
              <span className={`text-[15px] font-bold tracking-tight ${dark ? "text-zinc-100" : "text-gray-900"}`}>
                {formatPolishDate(selectedDate)}
              </span>
              <span className={`ml-1.5 text-[12px] font-normal ${dark ? "text-zinc-400" : "text-gray-500"}`}>
                {selectedDate}
              </span>
            </div>
          </button>
        </div>

        <button
          type="button"
          onClick={() => handleShift(1)}
          className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
            dark ? "text-zinc-400 hover:bg-zinc-800 hover:text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
          aria-label="Następny dzień"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Date Picker Input Modal / Popup */}
      {showDatePicker && (
        <div className="mt-3 mb-2 flex items-center justify-center gap-2 rounded-2xl bg-emerald-500/10 p-3 border border-emerald-500/20">
          <label className={`text-[13px] font-medium ${dark ? "text-zinc-200" : "text-gray-800"}`}>
            Wybierz datę:
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              if (e.target.value) {
                onDateChange(e.target.value);
                setShowDatePicker(false);
              }
            }}
            className="rounded-xl border border-emerald-500/30 bg-white px-3 py-1.5 text-[13px] font-semibold text-gray-900 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="button"
            onClick={() => {
              onDateChange(today);
              setShowDatePicker(false);
            }}
            className="rounded-xl bg-emerald-500 px-2.5 py-1.5 text-[12px] font-semibold text-white shadow-sm hover:bg-emerald-600"
          >
            Dziś
          </button>
        </div>
      )}

      {/* Weekdays Strip (Fitatu Style) */}
      <div className="mt-3 grid grid-cols-7 gap-1.5">
        {weekDays.map((item) => {
          const isSelected = item.date === selectedDate;
          const isToday = item.date === today;

          return (
            <button
              key={item.date}
              type="button"
              onClick={() => onDateChange(item.date)}
              className={`flex flex-col items-center justify-center rounded-2xl py-2 transition-all duration-150 ${
                isSelected
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25 scale-102"
                  : isToday
                  ? dark
                    ? "bg-zinc-800/80 text-emerald-400 border border-emerald-500/30"
                    : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                  : dark
                  ? "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="text-[10px] font-semibold tracking-wider">{item.label}</span>
              <span className="text-[14px] font-bold leading-tight mt-0.5">{item.dayNum}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
