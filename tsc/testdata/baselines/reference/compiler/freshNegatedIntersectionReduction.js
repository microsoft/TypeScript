//// [tests/cases/compiler/freshNegatedIntersectionReduction.ts] ////

//// [freshNegatedIntersectionReduction.ts]
export function narrowedArray<Value extends unknown[] | undefined>(value: Value) {
    if (typeof value !== "undefined") {
        for (const element of value) {}
        return [...value];
    }
    return [];
}

export function explicitUndefined<Value>(value: Value & not undefined) {
    if (typeof value !== "undefined") {
        const retained = value;
        return retained;
    }
    throw new Error();
}

export function explicitNull<Value>(value: Value & not null) {
    if (value !== null) {
        const retained = value;
        return retained;
    }
    throw new Error();
}

export function freshOnly<Value>(value: Value) {
    if (typeof value !== "string") {
        const widened = value;
        return widened;
    }
    throw new Error();
}

export function explicitString<Value>(value: Value & not string) {
    if (typeof value !== "string") {
        const retained = value;
        return retained;
    }
    throw new Error();
}

export function unionFreshFirst(value: unknown, regular: not string, choose: boolean) {
    if (typeof value !== "string") {
        const merged = choose ? value : regular;
        return merged;
    }
    throw new Error();
}

export function unionRegularFirst(value: unknown, regular: not string, choose: boolean) {
    if (typeof value !== "string") {
        const merged = choose ? regular : value;
        return merged;
    }
    throw new Error();
}

//// [freshNegatedIntersectionReduction.js]
export function narrowedArray(value) {
    if (typeof value !== "undefined") {
        for (const element of value) { }
        return [...value];
    }
    return [];
}
export function explicitUndefined(value) {
    if (typeof value !== "undefined") {
        const retained = value;
        return retained;
    }
    throw new Error();
}
export function explicitNull(value) {
    if (value !== null) {
        const retained = value;
        return retained;
    }
    throw new Error();
}
export function freshOnly(value) {
    if (typeof value !== "string") {
        const widened = value;
        return widened;
    }
    throw new Error();
}
export function explicitString(value) {
    if (typeof value !== "string") {
        const retained = value;
        return retained;
    }
    throw new Error();
}
export function unionFreshFirst(value, regular, choose) {
    if (typeof value !== "string") {
        const merged = choose ? value : regular;
        return merged;
    }
    throw new Error();
}
export function unionRegularFirst(value, regular, choose) {
    if (typeof value !== "string") {
        const merged = choose ? regular : value;
        return merged;
    }
    throw new Error();
}


//// [freshNegatedIntersectionReduction.d.ts]
export declare function narrowedArray<Value extends unknown[] | undefined>(value: Value): (Value & {})[number][];
export declare function explicitUndefined<Value>(value: Value & not undefined): Value & not undefined;
export declare function explicitNull<Value>(value: Value & not null): Value & not null;
export declare function freshOnly<Value>(value: Value): Value;
export declare function explicitString<Value>(value: Value & not string): Value & not string;
export declare function unionFreshFirst(value: unknown, regular: not string, choose: boolean): not string;
export declare function unionRegularFirst(value: unknown, regular: not string, choose: boolean): not string;
