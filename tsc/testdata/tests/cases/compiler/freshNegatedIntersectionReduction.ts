// @strict: true
// @target: es2015
// @declaration: true

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