//// [tests/cases/compiler/jsDeclarationEmitFunction.ts] ////

//// [types.d.ts]
type Foo = () => void;

//// [a.js]
/** @type {Foo} */
const f1 = function test() {};

/** @type {Foo} */
const f2 = function () {};

/** @type {Foo} */
const f3 = () => {};

/** @type {Foo} */
function f4 () {};




//// [a.d.ts]
/** @type {Foo} */
declare const f1: Foo;
/** @type {Foo} */
declare const f2: Foo;
/** @type {Foo} */
declare const f3: Foo;
/** @type {Foo} */
declare function f4(): void;
