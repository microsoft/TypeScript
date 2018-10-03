//// [declarationEmitIndexTypeArray.ts]
function doSomethingWithKeys<T>(...keys: (keyof T)[]) { }

const utilityFunctions = {
  doSomethingWithKeys
};


//// [declarationEmitIndexTypeArray.js]
function doSomethingWithKeys() {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
}
var utilityFunctions = {
    doSomethingWithKeys: doSomethingWithKeys
};


//// [declarationEmitIndexTypeArray.d.ts]
declare function doSomethingWithKeys<T>(...keys: (keyof T)[]): void;
declare const utilityFunctions: {
    doSomethingWithKeys: typeof doSomethingWithKeys;
};
