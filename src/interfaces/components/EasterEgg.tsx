"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Whimsical landing-page easter egg (interfaces/adapters layer).
 *
 * Renders a subtle sparkle trigger. Clicking it fires one of several random
 * "surprises" — a motivational quote, an emoji burst, a color flash, or a
 * bouncing message. Pure presentation: no business logic, no data access.
 *
 * The surprise is rendered into a fixed, pointer-events-none overlay so it
 * never blocks interaction with the rest of the page, and every surprise is
 * dismissible (auto-dismiss on a timer, plus a manual close on the toasts).
 */

type Surprise =
  | { kind: "quote"; text: string }
  | { kind: "emoji"; emojis: string[] }
  | { kind: "flash"; color: string }
  | { kind: "message"; text: string; emoji: string };

const QUOTES = [
  "Ship it. You can always iterate. ✨",
  "Clean code is a love letter to your future self. 💌",
  "Small steps, compounding wins. 🚀",
  "You are exactly one commit away from a breakthrough. 💡",
  "Done is better than perfect — then make it perfect. 🎯",
];

const EMOJI_SETS = [
  ["🎉", "✨", "🥳", "🎊", "💖"],
  ["🌸", "🌺", "🌷", "💐", "🌹"],
  ["🚀", "⭐", "🌟", "💫", "🛸"],
  ["🐱", "🦄", "🐣", "🦋", "🐙"],
];

const FLASH_COLORS = ["#be185d", "#f472b6", "#a855f7", "#22d3ee", "#f59e0b"];

const MESSAGES = [
  { text: "You found the secret sparkle!", emoji: "🪄" },
  { text: "Achievement unlocked: Curious Clicker", emoji: "🏆" },
  { text: "Here, have some good vibes.", emoji: "🌈" },
  { text: "Pssst… you're doing great.", emoji: "🤫" },
];

/** Pick a random element, avoiding an immediate repeat of `previous`. */
function pickDifferent<T>(items: T[], previous: T | null): T {
  if (items.length <= 1) return items[0];
  let choice = items[Math.floor(Math.random() * items.length)];
  let guard = 0;
  while (choice === previous && guard < 10) {
    choice = items[Math.floor(Math.random() * items.length)];
    guard += 1;
  }
  return choice;
}

const KINDS: Surprise["kind"][] = ["quote", "emoji", "flash", "message"];

function buildSurprise(previousKind: Surprise["kind"] | null): Surprise {
  const kind = pickDifferent(KINDS, previousKind);
  switch (kind) {
    case "quote":
      return { kind, text: QUOTES[Math.floor(Math.random() * QUOTES.length)] };
    case "emoji":
      return {
        kind,
        emojis: EMOJI_SETS[Math.floor(Math.random() * EMOJI_SETS.length)],
      };
    case "flash":
      return {
        kind,
        color: FLASH_COLORS[Math.floor(Math.random() * FLASH_COLORS.length)],
      };
    case "message":
    default:
      return { kind: "message", ...MESSAGES[Math.floor(Math.random() * MESSAGES.length)] };
  }
}

export function EasterEgg() {
  const [surprise, setSurprise] = useState<Surprise | null>(null);
  // A monotonically increasing key so re-triggering the same kind restarts
  // its CSS animation.
  const [nonce, setNonce] = useState(0);
  const lastKind = useRef<Surprise["kind"] | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setSurprise(null);
  }, []);

  const trigger = useCallback(() => {
    const next = buildSurprise(lastKind.current);
    lastKind.current = next.kind;
    setSurprise(next);
    setNonce((n) => n + 1);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setSurprise(null), 3200);
  }, []);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={trigger}
        aria-label="Reveal a little surprise"
        title="Psst… click me"
        className="inline-flex h-6 w-6 items-center justify-center rounded-full text-base leading-none text-brand/70 transition-transform hover:scale-125 hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        <span aria-hidden="true">✨</span>
      </button>

      {surprise ? (
        <SurpriseOverlay
          key={nonce}
          surprise={surprise}
          onDismiss={dismiss}
        />
      ) : null}
    </>
  );
}

function SurpriseOverlay({
  surprise,
  onDismiss,
}: {
  surprise: Surprise;
  onDismiss: () => void;
}) {
  // The overlay itself never intercepts clicks (pointer-events-none); only the
  // dismiss buttons on the toasts opt back in, so the page stays fully usable.
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {surprise.kind === "flash" ? (
        <div
          className="egg-color-flash absolute inset-0"
          style={{
            backgroundColor: surprise.color,
            animation: "egg-color-flash 1.1s ease-out forwards",
          }}
        />
      ) : null}

      {surprise.kind === "emoji" ? (
        <div className="absolute inset-x-0 bottom-16 flex justify-center gap-3">
          {surprise.emojis.map((emoji, i) => (
            <span
              key={i}
              className="egg-float-up text-4xl"
              style={{
                animation: "egg-float-up 1.8s ease-out forwards",
                animationDelay: `${i * 90}ms`,
              }}
            >
              {emoji}
            </span>
          ))}
        </div>
      ) : null}

      {surprise.kind === "quote" || surprise.kind === "message" ? (
        <div className="absolute inset-x-0 top-6 flex justify-center px-4">
          <div
            role="status"
            className="egg-pop-in pointer-events-auto flex max-w-sm items-start gap-3 rounded-xl border border-pink-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur"
            style={{ animation: "egg-pop-in 0.35s ease-out" }}
          >
            <p className="text-sm font-medium text-slate-700">
              {surprise.kind === "message" ? (
                <>
                  <span aria-hidden="true" className="mr-1">
                    {surprise.emoji}
                  </span>
                  {surprise.text}
                </>
              ) : (
                surprise.text
              )}
            </p>
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss surprise"
              className="-mr-1 -mt-0.5 shrink-0 rounded p-1 text-slate-400 transition-colors hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
