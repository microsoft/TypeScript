//// [tests/cases/conformance/jsdoc/extendsTag14.ts] ////

//// [a.js]
/** @template T */
class A {}

/** @extends {A<string>} */
class B extends null {}

/** @augments {A<number>} */
class C extends null {}


//// [a.js]
"use strict";
/** @template T */
class A {
}
/** @extends {A<string>} */
class B extends null {
}
/** @augments {A<number>} */
class C extends null {
}


//// [a.d.ts]
/** @template T */
declare class A<T> {
}
/** @extends {A<string>} */
declare class B extends null {
}
/** @augments {A<number>} */
declare class C extends null {
}
