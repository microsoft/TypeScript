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



//// [declarationEmitCastReusesTypeNode1.d.ts]
type P = {} & {
    name: string;
};
export declare let vLet: P;
export declare const vConst: P;
export declare function fn(p?: P): void;
export declare function fnWithRequiredDefaultParam(p: P, req: number): void;
export declare class C {
    ctorField: P;
    field: P;
    optField?: P;
    readonly roFiled: P;
    method(p?: P): void;
    methodWithRequiredDefault(p: P, req: number): void;
    constructor(ctorField?: P);
    get x(): P;
    set x(v: P);
}
declare const _default: P;
export default _default;
export declare function fnWithPartialAnnotationOnDefaultparam(x: P, b: number): void;
