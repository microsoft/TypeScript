//// [tests/cases/compiler/jsdocMultilineUnion.ts] ////

//// [a.js]
/**
 * @typedef {("a"|"b"|"c"|
 *   "d"|"e"|"f"|"g"|
 *   "h"|"i"|
 *   "j"|
 *   "k"|"l"|
 *   "m"|"n")[]} T
 */




//// [a.d.ts]
/**
 * @typedef {("a"|"b"|"c"|
 *   "d"|"e"|"f"|"g"|
 *   "h"|"i"|
 *   "j"|
 *   "k"|"l"|
 *   "m"|"n")[]} T
 */
type T = ("a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n")[];
