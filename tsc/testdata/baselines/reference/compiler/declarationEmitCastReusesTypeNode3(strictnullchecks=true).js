//// [tests/cases/compiler/declarationEmitCastReusesTypeNode3.ts] ////

//// [declarationEmitCastReusesTypeNode3.ts]
type P = { } & { name: string }

export let vLet = <P>null!
export const vConst = <P>null!

export function fn(p = <P>null!) {}

export function fnWithRequiredDefaultParam(p = <P>null!, req: number) {}

export class C {
    field = <P>null!
    optField? = <P>null!
    readonly roFiled = <P>null!;
    method(p = <P>null!) {}
    methodWithRequiredDefault(p = <P>null!, req: number) {}

    constructor(public ctorField = <P>null!) {}

    get x() { return <P>null! }
    set x(v) { }
}

export default <P>null!;

// allows `undefined` on the input side, thanks to the initializer
export function fnWithPartialAnnotationOnDefaultparam(x: P = <P>null!, b: number) {}



//// [declarationEmitCastReusesTypeNode3.d.ts]
type P = {} & {
    name: string;
};
export declare let vLet: P;
export declare const vConst: P;
export declare function fn(p?: P): void;
export declare function fnWithRequiredDefaultParam(p: P | undefined, req: number): void;
export declare class C {
    ctorField: P;
    field: P;
    optField?: P;
    readonly roFiled: P;
    method(p?: P): void;
    methodWithRequiredDefault(p: P | undefined, req: number): void;
    constructor(ctorField?: P);
    get x(): P;
    set x(v: P);
}
declare const _default: P;
export default _default;
export declare function fnWithPartialAnnotationOnDefaultparam(x: P | undefined, b: number): void;
