//// [tests/cases/compiler/declarationEmitIndexTypeArray.ts] ////

//// [declarationEmitIndexTypeArray.ts]
function doSomethingWithKeys<T>(...keys: (keyof T)[]) { }

const utilityFunctions = {
  doSomethingWithKeys
};


//// [declarationEmitIndexTypeArray.js]
function doSomethingWithKeys(...keys) { }
const utilityFunctions = {
    doSomethingWithKeys
};


//// [declarationEmitIndexTypeArray.d.ts]
declare function doSomethingWithKeys<T>(...keys: (keyof T)[]): void;
declare const utilityFunctions: {
    doSomethingWithKeys: typeof doSomethingWithKeys;
};
