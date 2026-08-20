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



//// [declarationEmitCastReusesTypeNode2.d.ts]
export declare let vLet: {} & {
    name: string;
};
export declare const vConst: {} & {
    name: string;
};
export declare function fn(p?: {} & {
    name: string;
}): void;
export declare function fnWithRequiredDefaultParam(p: {} & {
    name: string;
}, req: number): void;
export declare class C {
    ctorField: {} & {
        name: string;
    };
    field: {} & {
        name: string;
    };
    optField?: {} & {
        name: string;
    };
    readonly roFiled: {} & {
        name: string;
    };
    method(p?: {} & {
        name: string;
    }): void;
    methodWithRequiredDefault(p: {} & {
        name: string;
    }, req: number): void;
    constructor(ctorField?: {} & {
        name: string;
    });
    get x(): {} & {
        name: string;
    };
    set x(v: {} & {
        name: string;
    });
}
declare const _default: {} & {
    name: string;
};
export default _default;
export declare function fnWithPartialAnnotationOnDefaultparam(x: {} & {
    name: string;
}, b: number): void;
