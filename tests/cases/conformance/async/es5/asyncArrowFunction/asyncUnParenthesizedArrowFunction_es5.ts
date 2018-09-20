// @target: ES5
// @lib: es5,es2015.promise
// @noEmitHelpers: true

declare function someOtherFunction(i: any): Promise<void>;
const x = async i => await someOtherFunction(i)
const x1 = async (i) => await someOtherFunction(i);