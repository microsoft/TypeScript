// @strict: true
// @target: esnext
// @declaration: true

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
