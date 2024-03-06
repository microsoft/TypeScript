// @declaration: true
// @allowJS: true
// @strict: true,false
// @emitDeclarationOnly: true

// @fileName: jsFile.js
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
