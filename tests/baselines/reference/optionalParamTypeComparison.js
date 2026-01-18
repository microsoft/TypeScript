//// [tests/cases/compiler/optionalParamTypeComparison.ts] ////

//// [optionalParamTypeComparison.ts]
declare var f: (s: string, n?: number) => void;
declare var g: (s: string, b?: boolean) => void;

f = g;
g = f;

//// [optionalParamTypeComparison.js]
f = g;
g = f;
