//// [tests/cases/compiler/optionalParamTypeComparison.ts] ////

//// [optionalParamTypeComparison.ts]
var f: (s: string, n?: number) => void;
var g: (s: string, b?: boolean) => void;

f = g;
g = f;

//// [optionalParamTypeComparison.js]
var f;
var g;
f = g;
g = f;
