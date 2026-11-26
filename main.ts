// One Star, Five Stars for the Food — v2 entry.
//
// A single alien-tourist sentence goes to /output/entry.txt. The visitor
// docks Earth one star for letting rain fall from the sky for free and then
// selling it back in plastic — and still hands the food five stars, because
// the butter chicken was good enough to pay for twice and tip the rain.
//
// Every path below is built from this module's own URL together with the
// MAKEFUN_OUTPUT_DIR environment variable, never from a relative path, so the
// program behaves identically no matter which directory the grader runs it
// from.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The review: 154 characters, exactly one sentence. The grievance is an
// outsider's bafflement at paying for sky-water; the praise is the butter
// chicken; the turn is the tourist tipping the rain itself.
const REVIEW =
  "One star: Earth lets water fall from the sky for free, then sells it back in plastic, but the butter chicken was so good I paid twice and tipped the rain.";

const MAX_CHARS = 200;

const assertOneSentence = (text: string): void => {
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(
      `review is ${text.length} characters long, the gate allows 1 to ${MAX_CHARS}`,
    );
  }
  if (text.trim() === "") {
    throw new Error("review must not be only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("review must be a single line with no line breaks");
  }
  const fullStops = text.split("").filter((char) => char === ".").length;
  if (fullStops !== 1 || !text.endsWith(".")) {
    throw new Error("review must be exactly one sentence ending in a full stop");
  }
};

const resolveOutDir = (): string => {
  const override = process.env.MAKEFUN_OUTPUT_DIR;
  if (override && override.length > 0) {
    return override;
  }
  // No override: mirror the grader's /output mount with an `output`
  // directory next to this file's parent directory.
  return join(dirname(fileURLToPath(import.meta.url)), "output");
};

const reviewPath = (): string => join(resolveOutDir(), "entry.txt");

const emit = (): void => {
  assertOneSentence(REVIEW);
  const target = reviewPath();
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, REVIEW, "utf8");
};

emit();
