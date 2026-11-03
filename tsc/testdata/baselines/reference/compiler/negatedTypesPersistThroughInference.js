//// [tests/cases/compiler/negatedTypesPersistThroughInference.ts] ////

//// [negatedTypesPersistThroughInference.ts]
declare function identity<T>(value: T): T;
declare function contextualIdentity<T>(callback: () => T): T;

export function nonString(value: unknown) {
    if (typeof value === "string") throw new Error();
    const constant = value;
    let variable = value;
    const inferred: not string = identity(value);
    const contextual: not string = contextualIdentity(() => value);
    return { constant, variable, inferred, contextual, values: [value] };
}

export function nonZero(value: number) {
    if (value === 0) throw new Error();
    const constant = value;
    let variable = value;
    const inferred: number & not 0 = identity(value);
    const contextual: number & not 0 = contextualIdentity(() => value);
    return { constant, variable, inferred, contextual, values: [value] };
}

export function generic<T>(value: T) {
    if (typeof value === "string") throw new Error();
    return identity(value);
}

export function notString(value: unknown) {
    return typeof value !== "string";
}

export function notZero(value: number) {
    return value !== 0;
}

export async function asyncNonString(value: unknown) {
    if (typeof value === "string") throw new Error();
    return value;
}

export function* generatorNonString(value: unknown) {
    if (typeof value === "string") throw new Error();
    yield value;
    return value;
}

export function explicitAndInferred(value: unknown, explicit: not string, condition: boolean) {
    if (typeof value === "string") throw new Error();
    return condition ? value : explicit;
}

export function inferredProperty(value: unknown) {
    if (typeof value === "string") throw new Error();
    const narrowed = value;
    return new class {
        property = narrowed;
        constructor(public parameter = narrowed) {}
    }();
}


//// [negatedTypesPersistThroughInference.js]
export function nonString(value) {
    if (typeof value === "string")
        throw new Error();
    const constant = value;
    let variable = value;
    const inferred = identity(value);
    const contextual = contextualIdentity(() => value);
    return { constant, variable, inferred, contextual, values: [value] };
}
export function nonZero(value) {
    if (value === 0)
        throw new Error();
    const constant = value;
    let variable = value;
    const inferred = identity(value);
    const contextual = contextualIdentity(() => value);
    return { constant, variable, inferred, contextual, values: [value] };
}
export function generic(value) {
    if (typeof value === "string")
        throw new Error();
    return identity(value);
}
export function notString(value) {
    return typeof value !== "string";
}
export function notZero(value) {
    return value !== 0;
}
export async function asyncNonString(value) {
    if (typeof value === "string")
        throw new Error();
    return value;
}
export function* generatorNonString(value) {
    if (typeof value === "string")
        throw new Error();
    yield value;
    return value;
}
export function explicitAndInferred(value, explicit, condition) {
    if (typeof value === "string")
        throw new Error();
    return condition ? value : explicit;
}
export function inferredProperty(value) {
    if (typeof value === "string")
        throw new Error();
    const narrowed = value;
    return new class {
        parameter;
        property = narrowed;
        constructor(parameter = narrowed) {
            this.parameter = parameter;
        }
    }();
}


//// [negatedTypesPersistThroughInference.d.ts]
export declare function nonString(value: unknown): {
    constant: not string;
    variable: not string;
    inferred: not string;
    contextual: not string;
    values: (not string)[];
};
export declare function nonZero(value: number): {
    constant: number & not 0;
    variable: number & not 0;
    inferred: number & not 0;
    contextual: number & not 0;
    values: (number & not 0)[];
};
export declare function generic<T>(value: T): T & not string;
export declare function notString(value: unknown): value is not string;
export declare function notZero(value: number): value is number & not 0;
export declare function asyncNonString(value: unknown): Promise<not string>;
export declare function generatorNonString(value: unknown): Generator<not string, not string, unknown>;
export declare function explicitAndInferred(value: unknown, explicit: not string, condition: boolean): not string;
export declare function inferredProperty(value: unknown): {
    property: not string;
    parameter: not string;
};
