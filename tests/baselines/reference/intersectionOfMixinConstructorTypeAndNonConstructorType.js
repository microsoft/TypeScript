//// [tests/cases/compiler/intersectionOfMixinConstructorTypeAndNonConstructorType.ts] ////

//// [intersectionOfMixinConstructorTypeAndNonConstructorType.ts]
// Repro for #17388

declare let x: {foo: undefined} & {new(...args: any[]): any};
new x();


//// [intersectionOfMixinConstructorTypeAndNonConstructorType.js]
"use strict";
// Repro for #17388
new x();
