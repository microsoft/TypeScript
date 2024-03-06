//// [tests/cases/compiler/verbatim-declarations-assertions-js.ts] ////

//// [jsFile.js]
// Types will not currently be preserved from type assertion
// string | string will become string

export let vLet = /** @type {string | string} */(null)
export const vConst = /** @type {string | string} */(null)

export function fn(p = /** @type {string | string} */(null)) {}

/**
 * @param {number} req 
*/
export function fnWithRequiredDefaultParam(p = /** @type {string | string} */(null), req) {}

export class C {
    field = /** @type {string | string} */(null)
    /** @readonly */
    roFiled = /** @type {string | string} */(null);
    method(p = /** @type {string | string} */(null)) {}
    /**
     * @param {number} req 
    */
    methodWithRequiredDefault(p = /** @type {string | string} */(null), req) {}

    constructor(ctorField = /** @type {string | string} */(null)) {}
}

export default /** @type {string | string} */(null);




//// [jsFile.d.ts]
export function fn(p?: string): void;
/**
 * @param {number} req
*/
export function fnWithRequiredDefaultParam(p: string, req: number): void;
export let vLet: string;
export const vConst: string;
export class C {
    constructor(ctorField?: string);
    field: string;
    /** @readonly */
    readonly roFiled: string;
    method(p?: string): void;
    /**
     * @param {number} req
    */
    methodWithRequiredDefault(p: string, req: number): void;
}
declare const _default: string;
export default _default;
