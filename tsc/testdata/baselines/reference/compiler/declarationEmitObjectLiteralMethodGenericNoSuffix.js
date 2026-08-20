//// [tests/cases/compiler/declarationEmitObjectLiteralMethodGenericNoSuffix.ts] ////

//// [declarationEmitObjectLiteralMethodGenericNoSuffix.ts]
export const o = {
    foo<M extends string>(): void { },
    bar<M extends string>(): void { },
};

export const o2 = {
    foo<T>(value: T): T { return value; },
    bar<T>(value: T): T { return value; },
    baz<T, U>(a: T, b: U): [T, U] { return [a, b]; },
};


//// [declarationEmitObjectLiteralMethodGenericNoSuffix.js]
export const o = {
    foo() { },
    bar() { },
};
export const o2 = {
    foo(value) { return value; },
    bar(value) { return value; },
    baz(a, b) { return [a, b]; },
};


//// [declarationEmitObjectLiteralMethodGenericNoSuffix.d.ts]
export declare const o: {
    foo<M extends string>(): void;
    bar<M extends string>(): void;
};
export declare const o2: {
    foo<T>(value: T): T;
    bar<T>(value: T): T;
    baz<T, U>(a: T, b: U): [T, U];
};
