// @strict: true
// @strictNullChecks: true,false
// @declaration: true
// @noTypesAndSymbols: true
// @emitDeclarationOnly: true
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