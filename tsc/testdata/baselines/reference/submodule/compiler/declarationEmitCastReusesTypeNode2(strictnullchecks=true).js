//// [tests/cases/compiler/declarationEmitCastReusesTypeNode2.ts] ////

//// [declarationEmitCastReusesTypeNode2.ts]
export let vLet = null! as {} & { name: string }
export const vConst = null! as {} & { name: string }

export function fn(p = null! as {} & { name: string }) {}

export function fnWithRequiredDefaultParam(p = null! as {} & { name: string }, req: number) {}

export class C {
    field = null! as {} & { name: string };
    optField? = null! as {} & { name: string };
    readonly roFiled = null! as {} & { name: string };
    method(p = null! as {} & { name: string }) {}
    methodWithRequiredDefault(p = null! as {} & { name: string }, req: number) {}

    constructor(public ctorField = null! as {} & { name: string }) {}

    get x() { return null! as {} & { name: string } }
    set x(v) { }
}

export default null! as {} & { name: string }

// allows `undefined` on the input side, thanks to the initializer
export function fnWithPartialAnnotationOnDefaultparam(x: {} & { name: string } = null! as {} & { name: string }, b: number) {}

//// [declarationEmitCastReusesTypeNode2.js]
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
