// @strict: true
// from https://github.com/microsoft/TypeScript/issues/30706
type ConditionalType<T> = T extends string ? string : number;

function ConditionalOrUndefined<T>(): ConditionalType<T> | undefined {
    return 0 as any;
}

function JustConditional<T>(): ConditionalType<T> {
    return ConditionalOrUndefined<T>()!; // shouldn't error
}


// For comparison...
function genericOrUndefined<T>(): T | undefined {
    return 0 as any;
}

function JustGeneric<T>(): T {
    return genericOrUndefined<T>()!; // no error
}

// Simplified example:

function f<T>() {
    type One = T extends string ? string : string;
    type A = T extends number ? One : never;
    const x: One = null as any as A;
}
