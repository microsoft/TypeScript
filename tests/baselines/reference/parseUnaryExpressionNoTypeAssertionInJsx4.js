//// [tests/cases/compiler/parseUnaryExpressionNoTypeAssertionInJsx4.ts] ////

//// [index.tsx]
const x = "oops";

const a = + <number> x;
const b = + <> x;
const c = + <1234> x;


//// [index.jsx]
var x = "oops";
var a = +<number> x;
const b = + <> x;
const c = + < />1234> x;
</></>;
