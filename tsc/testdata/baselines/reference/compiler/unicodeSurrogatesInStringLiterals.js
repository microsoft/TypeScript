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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lowHigh = exports.lowLow = exports.highHigh = exports.low = exports.high = exports.highLow = void 0;
// low-high surrogate pair - the "correct" case
exports.highLow = "\ud83d\ude03";
// high surrogate
exports.high = "\ud83d";
// low surrogate
exports.low = "\ude03";
// two high surrogates
exports.highHigh = "\ud83d\ud83d";
// two low surrogates
exports.lowLow = "\ude03\ude03";
// swapped expected order of surrogates
exports.lowHigh = "\ude03\ud83d";


//// [unicodeSurrogatesInStringLiterals.d.ts]
export declare const highLow: "😃";
export declare const high: "�";
export declare const low: "�";
export declare const highHigh: "��";
export declare const lowLow: "��";
export declare const lowHigh: "��";
