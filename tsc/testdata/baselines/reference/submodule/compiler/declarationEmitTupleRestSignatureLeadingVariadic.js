//// [tests/cases/compiler/declarationEmitTupleRestSignatureLeadingVariadic.ts] ////

//// [declarationEmitTupleRestSignatureLeadingVariadic.ts]
const f = <TFirstArgs extends any[], TLastArg>(...args: [...TFirstArgs, TLastArg]): void => {};

//// [declarationEmitTupleRestSignatureLeadingVariadic.js]
const f = (...args) => { };
