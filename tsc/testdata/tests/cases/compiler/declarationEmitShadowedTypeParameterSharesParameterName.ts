// @target: esnext
// @module: esnext
// @declaration: true
// @strict: true

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
