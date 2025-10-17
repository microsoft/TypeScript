//// [tests/cases/conformance/jsdoc/jsdocImplements_missingType.ts] ////

//// [a.js]
class A { constructor() { this.x = 0; } }
/** @implements */
class B  {
}




//// [a.d.ts]
declare class A {
    constructor();
}
/** @implements */
declare class B implements  {
}
