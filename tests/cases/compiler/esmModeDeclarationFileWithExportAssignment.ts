// @target: esnext
// @module: nodenext
// @allowSyntheticDefaultImports: true
// @strict: true
// @filename: other.d.mts
declare function example(): 5;
export = example;

// @filename: main.mts
import example from "./other.mjs";
example();