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
export type P = {} & {
    name?: string;
};
export declare let vLet: {
    name?: string | undefined;
};
export declare const vConst: {
    name?: string | undefined;
};
export declare function fn(p?: {
    name?: string | undefined;
}): void;
/** @param {number} req */
export declare function fnWithRequiredDefaultParam(p: {
    name?: string | undefined;
} | undefined, req: number): void;
export declare class C {
    field: {
        name?: string | undefined;
    };
    /** @optional */ optField: {
        name?: string | undefined;
    };
    /** @readonly */ readonly roFiled: {
        name?: string | undefined;
    };
    method(p?: {
        name?: string | undefined;
    }): void;
    /** @param {number} req */
    methodWithRequiredDefault(p: {
        name?: string | undefined;
    } | undefined, req: number): void;
    constructor(ctorField?: {
        name?: string | undefined;
    });
    get x(): {
        name?: string | undefined;
    };
    set x(v: {
        name?: string | undefined;
    });
}
declare const _default: {
    name?: string | undefined;
};
export default /** @type {P} */ _default;
/**
 *
 * @param {P} x
 * @param {number} b
 */
export declare function fnWithPartialAnnotationOnDefaultparam(x: {
    name?: string | undefined;
} | undefined, b: number): void;
