//// [tests/cases/compiler/jsdocTypedefNoCrash2.ts] ////

//// [export.js]
export type foo = 5;
/**
 * @typedef {{
 * }}
 */
export const foo = 5;

//// [export.js]
/**
 * @typedef {{
 * }}
 */
export const foo = 5;
