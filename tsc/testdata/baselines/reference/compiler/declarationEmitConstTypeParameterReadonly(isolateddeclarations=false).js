//// [tests/cases/compiler/declarationEmitConstTypeParameterReadonly.ts] ////

//// [declarationEmitConstTypeParameterReadonly.ts]
declare function id<const C>(c: C): C;
export const b = id({ A: { f: () => 1 } });
export const annotatedFunction = id({ A: { f: (): number => 1 } });

const leaf = { a: 1 } as const;
export const twoRefs = id({ properties: { one: leaf, two: leaf } });

export const nested = id({ A: [{ f: () => 1 }] });

const tupleLeaf = [1, "a"] as const;
export const twoTupleRefs = id({ properties: { one: tupleLeaf, two: tupleLeaf } });

export const getterOnly = {
    get value(): number {
        return 1;
    },
};

export const getterAndSetter = {
    get value(): number {
        return 1;
    },
    set value(value: number) {},
};

declare function readonlyInput<const T>(arg: { readonly [K in keyof T]: T[K] }): T;
declare function mutableInput<const T>(arg: { -readonly [K in keyof T]: T[K] }): T;

export const mappedScalars = readonlyInput({ foo: "str", bar: 42 });
export const readonlyParameter = readonlyInput({ value: { f: () => 1 } });
export const mutableParameter = mutableInput({ value: { f: () => 1 } });

declare function addReadonly<const T>(arg: { value: T }): {
    value: { readonly [K in keyof T]: T[K] };
};
declare function removeReadonly<const T>(arg: { value: T }): {
    value: { -readonly [K in keyof T]: T[K] };
};

export const readonlyResult = addReadonly({ value: { f: () => 1 } });
export const mutableResult = removeReadonly({ value: { f: () => 1 } } as const);




//// [declarationEmitConstTypeParameterReadonly.d.ts]
export declare const b: {
    readonly A: {
        readonly f: () => 1;
    };
};
export declare const annotatedFunction: {
    readonly A: {
        readonly f: () => number;
    };
};
export declare const twoRefs: {
    readonly properties: {
        readonly one: {
            readonly a: 1;
        };
        readonly two: {
            readonly a: 1;
        };
    };
};
export declare const nested: {
    readonly A: readonly [{
        readonly f: () => 1;
    }];
};
export declare const twoTupleRefs: {
    readonly properties: {
        readonly one: readonly [1, "a"];
        readonly two: readonly [1, "a"];
    };
};
export declare const getterOnly: {
    readonly value: number;
};
export declare const getterAndSetter: {
    get value(): number;
    set value(value: number);
};
export declare const mappedScalars: {
    foo: "str";
    bar: 42;
};
export declare const readonlyParameter: {
    value: {
        readonly f: () => 1;
    };
};
export declare const mutableParameter: {
    readonly value: {
        readonly f: () => 1;
    };
};
export declare const readonlyResult: {
    value: {
        readonly f: () => 1;
    };
};
export declare const mutableResult: {
    value: {
        f: () => 1;
    };
};
