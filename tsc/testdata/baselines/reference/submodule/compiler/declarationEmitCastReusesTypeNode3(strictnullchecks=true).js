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
export declare let vLet: {
    name: string;
};
export declare const vConst: {
    name: string;
};
export declare function fn(p?: {
    name: string;
}): void;
export declare function fnWithRequiredDefaultParam(p: {
    name: string;
} | undefined, req: number): void;
export declare class C {
    ctorField: {
        name: string;
    };
    field: {
        name: string;
    };
    optField?: {
        name: string;
    } | undefined;
    readonly roFiled: {
        name: string;
    };
    method(p?: {
        name: string;
    }): void;
    methodWithRequiredDefault(p: {
        name: string;
    } | undefined, req: number): void;
    constructor(ctorField?: {
        name: string;
    });
    get x(): {
        name: string;
    };
    set x(v: {
        name: string;
    });
}
declare const _default: {
    name: string;
};
export default _default;
export declare function fnWithPartialAnnotationOnDefaultparam(x: {
    name: string;
} | undefined, b: number): void;
