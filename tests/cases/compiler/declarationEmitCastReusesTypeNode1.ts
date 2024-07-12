// @strict: true
// @strictNullChecks: true,false
// @declaration: true
// @noTypesAndSymbols: true
// @emitDeclarationOnly: true
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