//// [tests/cases/compiler/declarationEmitCastReusesTypeNode4.ts] ////

//// [input.js]
/**
 * @typedef {{ } & { name?: string }} P
 */

const something = /** @type {*} */(null);

export let vLet = /** @type {P} */(something);
export const vConst = /** @type {P} */(something);

export function fn(p = /** @type {P} */(something)) {}

/** @param {number} req */
export function fnWithRequiredDefaultParam(p = /** @type {P} */(something), req) {}

export class C {
    field = /** @type {P} */(something);
    /** @optional */ optField = /** @type {P} */(something); // not a thing
    /** @readonly */ roFiled = /** @type {P} */(something);
    method(p = /** @type {P} */(something)) {}
    /** @param {number} req */
    methodWithRequiredDefault(p = /** @type {P} */(something), req) {}

    constructor(ctorField = /** @type {P} */(something)) {}

    get x() { return /** @type {P} */(something) }
    set x(v) { }
}

export default /** @type {P} */(something);

// allows `undefined` on the input side, thanks to the initializer
/**
 * 
 * @param {P} x
 * @param {number} b
 */
export function fnWithPartialAnnotationOnDefaultparam(x = /** @type {P} */(something), b) {}



//// [input.d.ts]
export function fn(p?: P): void;
/** @param {number} req */
export function fnWithRequiredDefaultParam(p: P | undefined, req: number): void;
/**
 *
 * @param {P} x
 * @param {number} b
 */
export function fnWithPartialAnnotationOnDefaultparam(x: P | undefined, b: number): void;
export let vLet: P;
export const vConst: P;
export class C {
    constructor(ctorField?: P);
    field: P;
    /** @optional */ optField: P;
    /** @readonly */ readonly roFiled: P;
    method(p?: P): void;
    /** @param {number} req */
    methodWithRequiredDefault(p: P | undefined, req: number): void;
    set x(v: P);
    get x(): P;
}
declare const _default: P;
export default _default;
export type P = {} & {
    name?: string;
};
