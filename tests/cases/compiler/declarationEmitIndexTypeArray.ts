// @target: es2015
// @declaration: true
function doSomethingWithKeys<T>(...keys: (keyof T)[]) { }

const utilityFunctions = {
  doSomethingWithKeys
};
