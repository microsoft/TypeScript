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
}, req: number): void;
export declare class C {
    ctorField: {
        name: string;
    };
    field: {
        name: string;
    };
    optField?: {
        name: string;
    };
    readonly roFiled: {
        name: string;
    };
    method(p?: {
        name: string;
    }): void;
    methodWithRequiredDefault(p: {
        name: string;
    }, req: number): void;
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
export declare function fnWithPartialAnnotationOnDefaultparam(x: P, b: number): void;
