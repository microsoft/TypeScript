// @noUncheckedIndexedAccess: true
// @noLib: true

// @filename: globals.ts
interface Array<T> {}
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number {}
interface Object {}
interface RegExp {}
interface String {}

// @filename: input.ts
declare var x: string[];
var [a] = x;
