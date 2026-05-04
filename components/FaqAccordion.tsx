"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  items: FaqItem[];
}

// ─── FaqAccordion ─────────────────────────────────────────────────────────────

export default function FaqAccordion({ items }: Props) {
  // Track which item index is currently open; null = all closed
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <dl className="divide-y divide-gray-200 border border-gray-200 bg-white shadow-sm overflow-hidden">
      {items.map(({ question, answer }, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={question}>
            {/* Question row — acts as the toggle button */}
            <dt>
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
                className="
                  flex w-full items-center justify-between gap-4
                  px-6 py-5 text-left
                  transition-colors duration-150 hover:bg-gray-50
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1B3A6B]
                "
              >
                <span className={`text-sm font-semibold ${isOpen ? "text-[#E8621A]" : "text-[#1B3A6B]"}`}>
                  {question}
                </span>

                {/* Animated +/− icon */}
                <span
                  className={`
                    flex size-6 shrink-0 items-center justify-center rounded-full
                    border-2 transition-all duration-200
                    ${isOpen
                      ? "border-[#E8621A] bg-[#E8621A] text-white rotate-45"
                      : "border-gray-300 bg-white text-gray-400"
                    }
                  `}
                  aria-hidden="true"
                >
                  {/* Plus icon — rotates to × when open */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
                    strokeLinecap="round" className="size-3.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>
            </dt>

            {/* Answer panel */}
            <dd
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              hidden={!isOpen}
              className="px-6 pb-5"
            >
              <p className="text-sm leading-relaxed text-gray-500">{answer}</p>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
