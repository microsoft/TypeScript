//// [tests/cases/conformance/jsdoc/jsdocImplements_importType.ts] ////

//// [a.js]
/** @implements {import('./b').B} */
class A {
    /** @return {number} */
    method() { throw new Error(); }
}
//// [b.ts]
export interface B  {
    method(): number
}




//// [b.d.ts]
export interface B {
    method(): number;
}
//// [a.d.ts]
/** @implements {import('./b').B} */
declare class A implements import('./b').B {
    /** @return {number} */
    method(): number;
}
