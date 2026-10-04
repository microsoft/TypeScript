// @declaration: true

// low-high surrogate pair - the "correct" case
export const highLow = "\ud83d\ude03" as const;

// high surrogate
export const high = "\ud83d" as const;

// low surrogate
export const low = "\ude03" as const;

// two high surrogates
export const highHigh = "\ud83d\ud83d" as const;

// two low surrogates
export const lowLow = "\ude03\ude03" as const;

// swapped expected order of surrogates
export const lowHigh = "\ude03\ud83d" as const;
