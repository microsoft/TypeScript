//// [tests/cases/compiler/declarationEmitCastReusesTypeNode1.ts] ////

//// [declarationEmitCastReusesTypeNode1.ts]
type P = { } & { name: string }

export let vLet = null! as P
export const vConst = null! as P

export function fn(p = null! as P) {}

export function fnWithRequiredDefaultParam(p = null! as P, req: number) {}

export class C {
    field = null! as P;
    optField? = null! as P;
    readonly roFiled = null! as P;
    method(p = null! as P) {}
    methodWithRequiredDefault(p = null! as P, req: number) {}

    constructor(public ctorField = null! as P) {}

    get x() { return null! as P }
    set x(v) { }
}

export default null! as P;

// allows `undefined` on the input side, thanks to the initializer
export function fnWithPartialAnnotationOnDefaultparam(x: P = null! as P, b: number) {}

//// [declarationEmitCastReusesTypeNode1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = exports.vConst = exports.vLet = void 0;
exports.fn = fn;
exports.fnWithRequiredDefaultParam = fnWithRequiredDefaultParam;
exports.fnWithPartialAnnotationOnDefaultparam = fnWithPartialAnnotationOnDefaultparam;
exports.vLet = null;
exports.vConst = null;
function fn(p = null) { }
function fnWithRequiredDefaultParam(p = null, req) { }
class C {
    ctorField;
    field = null;
    optField = null;
    roFiled = null;
    method(p = null) { }
    methodWithRequiredDefault(p = null, req) { }
    constructor(ctorField = null) {
        this.ctorField = ctorField;
    }
    get x() { return null; }
    set x(v) { }
}
exports.C = C;
exports.default = null;
function fnWithPartialAnnotationOnDefaultparam(x = null, b) { }
