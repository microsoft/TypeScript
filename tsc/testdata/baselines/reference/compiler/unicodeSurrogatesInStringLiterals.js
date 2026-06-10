//// [tests/cases/compiler/unicodeSurrogatesInStringLiterals.ts] ////

//// [unicodeSurrogatesInStringLiterals.ts]
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


//// [unicodeSurrogatesInStringLiterals.js]
// low-high surrogate pair - the "correct" case
export const highLow = "\ud83d\ude03";
// high surrogate
export const high = "\ud83d";
// low surrogate
export const low = "\ude03";
// two high surrogates
export const highHigh = "\ud83d\ud83d";
// two low surrogates
export const lowLow = "\ude03\ude03";
// swapped expected order of surrogates
export const lowHigh = "\ude03\ud83d";


//// [unicodeSurrogatesInStringLiterals.d.ts]
export declare const highLow: "😃";
export declare const high: "\uD83D";
export declare const low: "\uDE03";
export declare const highHigh: "\uD83D\uD83D";
export declare const lowLow: "\uDE03\uDE03";
export declare const lowHigh: "\uDE03\uD83D";
