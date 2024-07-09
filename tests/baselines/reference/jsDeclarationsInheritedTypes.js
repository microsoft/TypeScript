//// [tests/cases/compiler/jsDeclarationsInheritedTypes.ts] ////

//// [a.js]
/**
 * @typedef A
 * @property {string} a
 */

/**
 * @typedef B
 * @property {number} b
 */

 class C1 {
    /**
     * @type {A}
     */
    value;
}

class C2 extends C1 {
    /**
     * @type {A}
     */
    value;
}

class C3 extends C1 {
    /**
     * @type {A & B}
     */
    value;
}




//// [a.d.ts]
/**
 * @typedef A
 * @property {string} a
 */
/**
 * @typedef B
 * @property {number} b
 */
declare class C1 {
    /**
     * @type {A}
     */
    value: A;
}
declare class C2 extends C1 {
}
declare class C3 extends C1 {
    /**
     * @type {A & B}
     */
    value: A & B;
}
type A = {
    a: string;
};
type B = {
    b: number;
};
