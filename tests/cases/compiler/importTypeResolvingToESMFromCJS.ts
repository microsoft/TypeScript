// @module: nodenext

// @Filename: /types.d.mts
export interface A {}

// @Filename: /main.cts
type A = import("./types.mjs").A;
