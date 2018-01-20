//// [declarationEmitIndexTypeArray.ts]
function doSomethingWithKeys<T>(...keys: (keyof T)[]) { }

const utilityFunctions = {
  doSomethingWithKeys
};


//// [declarationEmitIndexTypeArray.js]
function doSomethingWithKeys() { }
var utilityFunctions = {
    doSomethingWithKeys: doSomethingWithKeys
};


//// [declarationEmitIndexTypeArray.d.ts]
declare function doSomethingWithKeys<T>(...keys: (keyof T)[]): void;
declare const utilityFunctions: {
    doSomethingWithKeys: typeof doSomethingWithKeys;
};
