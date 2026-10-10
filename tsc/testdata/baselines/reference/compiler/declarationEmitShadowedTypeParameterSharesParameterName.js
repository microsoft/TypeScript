//// [tests/cases/compiler/declarationEmitShadowedTypeParameterSharesParameterName.ts] ////

//// [declarationEmitShadowedTypeParameterSharesParameterName.ts]
export function predicate<value>(value: value) {
    return function <value>(value: value): value is value & string {
        return typeof value === "string";
    };
}

export function assertion<value>(value: value) {
    return function <value>(value: value): asserts value is value & string {
        if (typeof value !== "string") throw value;
    };
}

export function query<value>(value: value) {
    return function <value>(value: value, other: typeof value): typeof value {
        return value;
    };
}

export function qualifiedQuery<value>(value: value) {
    return function <value extends { a: number }>(value: value): typeof value.a {
        return value.a;
    };
}

export function capturedPredicate<value>(value: value) {
    return function <value>(value: value, value_1: unknown): value is value & string {
        return typeof value === "string";
    };
}

export function capturedQuery<value>(value: value) {
    return function <value>(value: value, value_1: number): typeof value {
        return value;
    };
}

export function nested<value>(value: value) {
    return function <value>(value: value) {
        return function <value>(value: value): typeof value {
            return value;
        };
    };
}

export const arrow = <value>(value: value) => <value>(value: value): value is value & string => typeof value === "string";

export function method<value>(value: value) {
    return {
        m<value>(value: value): asserts value {
            if (!value) throw value;
        },
    };
}

export function local<value>(value: value) {
    return function <value>(x: value) {
        const value = 1;
        const result: { a: typeof value; b: value } = { a: value, b: x };
        return result;
    };
}


//// [declarationEmitShadowedTypeParameterSharesParameterName.js]
export function predicate(value) {
    return function (value) {
        return typeof value === "string";
    };
}
export function assertion(value) {
    return function (value) {
        if (typeof value !== "string")
            throw value;
    };
}
export function query(value) {
    return function (value, other) {
        return value;
    };
}
export function qualifiedQuery(value) {
    return function (value) {
        return value.a;
    };
}
export function capturedPredicate(value) {
    return function (value, value_1) {
        return typeof value === "string";
    };
}
export function capturedQuery(value) {
    return function (value, value_1) {
        return value;
    };
}
export function nested(value) {
    return function (value) {
        return function (value) {
            return value;
        };
    };
}
export const arrow = (value) => (value) => typeof value === "string";
export function method(value) {
    return {
        m(value) {
            if (!value)
                throw value;
        },
    };
}
export function local(value) {
    return function (x) {
        const value = 1;
        const result = { a: value, b: x };
        return result;
    };
}


//// [declarationEmitShadowedTypeParameterSharesParameterName.d.ts]
export declare function predicate<value>(value: value): <value_1>(value: value_1) => value_1 is value_1 & string;
export declare function assertion<value>(value: value): <value_1>(value: value_1) => asserts value_1 is value_1 & string;
export declare function query<value>(value: value): <value_1>(value: value_1, other: typeof value_1) => typeof value_1;
export declare function qualifiedQuery<value>(value: value): <value_1 extends {
    a: number;
}>(value: value_1) => typeof value_1.a;
export declare function capturedPredicate<value>(value: value): <value_1>(value: value_1, value_1: unknown) => value_1 is value_1 & string;
export declare function capturedQuery<value>(value: value): <value_1>(value: value_1, value_1: number) => typeof value_1;
export declare function nested<value>(value: value): <value_1>(value: value_1) => <value_2>(value: value_2) => typeof value_2;
export declare const arrow: <value>(value: value) => <value_1>(value: value_1) => value_1 is value_1 & string;
export declare function method<value>(value: value): {
    m<value_1>(value: value_1): asserts value_1;
};
export declare function local<value>(value: value): <value_1>(x: value_1) => {
    a: typeof value_1;
    b: value_1;
};


//// [DtsFileErrors]


declarationEmitShadowedTypeParameterSharesParameterName.d.ts(1,86): error TS1225: Cannot find parameter 'value_1'.
declarationEmitShadowedTypeParameterSharesParameterName.d.ts(2,94): error TS1225: Cannot find parameter 'value_1'.
declarationEmitShadowedTypeParameterSharesParameterName.d.ts(3,93): error TS2693: 'value_1' only refers to a type, but is being used as a value here.
declarationEmitShadowedTypeParameterSharesParameterName.d.ts(3,112): error TS2693: 'value_1' only refers to a type, but is being used as a value here.
declarationEmitShadowedTypeParameterSharesParameterName.d.ts(6,30): error TS2693: 'value_1' only refers to a type, but is being used as a value here.
declarationEmitShadowedTypeParameterSharesParameterName.d.ts(9,119): error TS2693: 'value_2' only refers to a type, but is being used as a value here.
declarationEmitShadowedTypeParameterSharesParameterName.d.ts(10,83): error TS1225: Cannot find parameter 'value_1'.
declarationEmitShadowedTypeParameterSharesParameterName.d.ts(12,41): error TS1225: Cannot find parameter 'value_1'.
declarationEmitShadowedTypeParameterSharesParameterName.d.ts(15,15): error TS2693: 'value_1' only refers to a type, but is being used as a value here.


==== declarationEmitShadowedTypeParameterSharesParameterName.d.ts (9 errors) ====
    export declare function predicate<value>(value: value): <value_1>(value: value_1) => value_1 is value_1 & string;
                                                                                         ~~~~~~~
!!! error TS1225: Cannot find parameter 'value_1'.
    export declare function assertion<value>(value: value): <value_1>(value: value_1) => asserts value_1 is value_1 & string;
                                                                                                 ~~~~~~~
!!! error TS1225: Cannot find parameter 'value_1'.
    export declare function query<value>(value: value): <value_1>(value: value_1, other: typeof value_1) => typeof value_1;
                                                                                                ~~~~~~~
!!! error TS2693: 'value_1' only refers to a type, but is being used as a value here.
                                                                                                                   ~~~~~~~
!!! error TS2693: 'value_1' only refers to a type, but is being used as a value here.
    export declare function qualifiedQuery<value>(value: value): <value_1 extends {
        a: number;
    }>(value: value_1) => typeof value_1.a;
                                 ~~~~~~~
!!! error TS2693: 'value_1' only refers to a type, but is being used as a value here.
    export declare function capturedPredicate<value>(value: value): <value_1>(value: value_1, value_1: unknown) => value_1 is value_1 & string;
    export declare function capturedQuery<value>(value: value): <value_1>(value: value_1, value_1: number) => typeof value_1;
    export declare function nested<value>(value: value): <value_1>(value: value_1) => <value_2>(value: value_2) => typeof value_2;
                                                                                                                          ~~~~~~~
!!! error TS2693: 'value_2' only refers to a type, but is being used as a value here.
    export declare const arrow: <value>(value: value) => <value_1>(value: value_1) => value_1 is value_1 & string;
                                                                                      ~~~~~~~
!!! error TS1225: Cannot find parameter 'value_1'.
    export declare function method<value>(value: value): {
        m<value_1>(value: value_1): asserts value_1;
                                            ~~~~~~~
!!! error TS1225: Cannot find parameter 'value_1'.
    };
    export declare function local<value>(value: value): <value_1>(x: value_1) => {
        a: typeof value_1;
                  ~~~~~~~
!!! error TS2693: 'value_1' only refers to a type, but is being used as a value here.
        b: value_1;
    };
    