// @declaration: true
// @strict: true,false

// @fileName: assertToTypeReferences.ts
type P = { } & { name: string }

export let vLet = null! as P
export const vConst = null! as P

export function fn(p = null! as P) {}

export function fnWithRequiredDefaultParam(p = null! as P, req: number) {}

export class C {
    field = null! as P
    readonly roFiled = null! as P;
    method(p = null! as P) {}
    methodWithRequiredDefault(p = null! as P, req: number) {}
    methodWithRequiredDefault2(p = null! as P, req: number) {}

    constructor(public ctorField = null! as P) {}
}

export default null! as P;

// @fileName: assertToTypeLiteral.ts

export let vLet = null! as {} & { name: string }
export const vConst = null! as {} & { name: string }

export function fn(p = null! as {} & { name: string }) {}

export function fnWithRequiredDefaultParam(p = null! as {} & { name: string }, req: number) {}

export class C {
    field = null! as {} & { name: string }
    readonly roFiled = null! as {} & { name: string };
    method(p = null! as {} & { name: string }) {}
    methodWithRequiredDefault(p = null! as {} & { name: string }, req: number) {}

    constructor(public ctorField = null! as {} & { name: string }) {}

    get x() { return null! as {} & { name: string } }
    set x(v) { }
}

export default null! as {} & { name: string }


// @fileName: assertToOtherTypes.ts
export const vNumberLiteral = null! as 1 | 1
export const vStringLiteral = null! as "1" | "1"
export const vLiteral = null! as "1" | "1"

type R = { foo: string }

export class C {
    // Can't know if references contain undefined, fall back to inference
    tsResolve? = null! as R | R;
    tsResolve2? = null! as R | R | string;
    // Simple type. we can add undefined
    reuseType? = null! as ((p: R) => void) | string | string;
    reuseType2? = null! as (new (p: R) => R) | string | string;
    reuseType3? = null! as string | number | bigint | symbol | unknown | any | never | symbol;
    reuseType4? = null! as [R, R, R] | [R, R, R];
    reuseType5? = null! as R[] | R[];
    reuseType6? = null! as 1 | "2" | 1n | 1n;
    reuseType7? = null! as `A` | `A`;
    reuseType8? = null! as `${string}-ok` | `${string}-ok`;
    reuseType9? = null! as this | this;
}