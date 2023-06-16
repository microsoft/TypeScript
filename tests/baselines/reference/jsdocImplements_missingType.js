//// [tests/cases/conformance/jsdoc/jsdocImplements_missingType.ts] ////

//// [a.js]
class A { constructor() { this.x = 0; } }
/** @implements */
class B  {
}




//// [a.d.ts]
declare class A {
    x: number;
}
/** @implements */
declare class B {
}
