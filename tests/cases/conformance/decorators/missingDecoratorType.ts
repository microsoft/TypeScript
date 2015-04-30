// @target: ES5
// @noLib: true

// @Filename: a.ts
interface Object { }
interface Array<T> { }
interface String { }
interface Boolean { }
interface Number { }
interface Function { }
interface RegExp { }
interface IArguments { }

// @Filename: b.ts
/// <reference path="a.ts" />
declare var dec: any;

@dec
class C {
}

