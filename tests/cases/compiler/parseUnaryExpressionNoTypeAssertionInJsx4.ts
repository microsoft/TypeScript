// @target: es2015
// @strict: false
// @filename: index.tsx
// @jsx: preserve

const x = "oops";

const a = + <number> x;
const b = + <> x;
const c = + <1234> x;
