//// [tests/cases/compiler/declarationEmitGlobalThisPreserved.ts] ////

//// [declarationEmitGlobalThisPreserved.ts]
// Adding this makes tooltips fail too.
// declare global {
//     namespace isNaN {
//         const prop: number;
//     }
// }

// Broken inference cases.

export const a1 = (isNaN: typeof globalThis.isNaN): typeof globalThis.isNaN => isNaN;
export const a2 = (isNaN: typeof globalThis.isNaN, bar?: typeof globalThis.isNaN): typeof globalThis.isNaN => bar ?? isNaN;
export const a3 = (isNaN: number, bar: typeof globalThis.isNaN): typeof globalThis.isNaN => bar;
export const a4 = (isNaN: number): typeof globalThis.isNaN => globalThis.isNaN;

export const aObj = {
    a1: (isNaN: typeof globalThis.isNaN): typeof globalThis.isNaN => isNaN,
    a2: (isNaN: typeof globalThis.isNaN, bar?: typeof globalThis.isNaN): typeof globalThis.isNaN => bar ?? isNaN,
    a3: (isNaN: number, bar: typeof globalThis.isNaN): typeof globalThis.isNaN => bar,
    a4: (isNaN: number): typeof globalThis.isNaN => globalThis.isNaN,
}

export type a4Return = ReturnType<ReturnType<typeof a4>>;
export type a4oReturn = ReturnType<ReturnType<typeof aObj['a4']>>;

export const b1 = (isNaN: typeof globalThis.isNaN) => isNaN;
export const b2 = (isNaN: typeof globalThis.isNaN, bar?: typeof globalThis.isNaN) => bar ?? isNaN;
export const b3 = (isNaN: number, bar: typeof globalThis.isNaN) => bar;
export const b4 = (isNaN: number) => globalThis.isNaN;

export const bObj = {
    b1: (isNaN: typeof globalThis.isNaN) => isNaN,
    b2: (isNaN: typeof globalThis.isNaN, bar?: typeof globalThis.isNaN) => bar ?? isNaN,
    b3: (isNaN: number, bar: typeof globalThis.isNaN) => bar,
    b4: (isNaN: number) => globalThis.isNaN,
}

export type b4Return = ReturnType<ReturnType<typeof b4>>;
export type b4oReturn = ReturnType<ReturnType<typeof bObj['b4']>>;

export function c1(isNaN: typeof globalThis.isNaN) { return isNaN }
export function c2(isNaN: typeof globalThis.isNaN, bar?: typeof globalThis.isNaN) { return bar ?? isNaN }
export function c3(isNaN: number, bar: typeof globalThis.isNaN) { return bar }
export function c4(isNaN: number) { return globalThis.isNaN; }

export const cObj = {
    c1(isNaN: typeof globalThis.isNaN) { return isNaN },
    c2(isNaN: typeof globalThis.isNaN, bar?: typeof globalThis.isNaN) { return bar ?? isNaN },
    c3(isNaN: number, bar: typeof globalThis.isNaN) { return bar },
    c4(isNaN: number) { return globalThis.isNaN; },
}

export type c4Return = ReturnType<ReturnType<typeof c4>>;
export type c4oReturn = ReturnType<ReturnType<typeof cObj['c4']>>;

export function d1() {
    const fn = (isNaN: typeof globalThis.isNaN): typeof globalThis.isNaN => isNaN;
    return function() { return fn };
}

export function d2() {
    const fn = (isNaN: typeof globalThis.isNaN, bar?: typeof globalThis.isNaN): typeof globalThis.isNaN => bar ?? isNaN;
    return function() { return fn };
}

export function d3() {
    const fn = (isNaN: number, bar: typeof globalThis.isNaN): typeof globalThis.isNaN => bar;
    return function() { return fn };
}

export function d4() {
    const fn = (isNaN: number): typeof globalThis.isNaN => globalThis.isNaN;
    return function() { return fn };
}

export type d4Return = ReturnType<ReturnType<ReturnType<ReturnType<typeof d4>>>>;

export class A {
    method1(isNaN: typeof globalThis.isNaN) { return isNaN }
    method2(isNaN: typeof globalThis.isNaN, bar?: typeof globalThis.isNaN) { return bar ?? isNaN }
    method3(isNaN: number, bar: typeof globalThis.isNaN) { return bar }
    method4(isNaN: number) { return globalThis.isNaN; }
}

export function fromParameter(isNaN: number, bar: typeof globalThis.isNaN) {
    return function() { return { bar } };
}

// Non-inference cases.

export const explicitlyTypedVariable: (isNaN: typeof globalThis.isNaN) => typeof globalThis.isNaN = (isNaN) => isNaN;

export function explicitlyTypedFunction(isNaN: typeof globalThis.isNaN): typeof globalThis.isNaN {
    return isNaN;
};

export type AsObjectProperty = {
    isNaN: typeof globalThis.isNaN;
}

export class AsClassProperty {
    isNaN?: typeof globalThis.isNaN;
}

export type AsFunctionType = (isNaN: typeof globalThis.isNaN) => typeof globalThis.isNaN;





//// [declarationEmitGlobalThisPreserved.d.ts]
export declare const a1: (isNaN: typeof globalThis.isNaN) => typeof globalThis.isNaN;
export declare const a2: (isNaN: typeof globalThis.isNaN, bar?: typeof globalThis.isNaN) => typeof globalThis.isNaN;
export declare const a3: (isNaN: number, bar: typeof globalThis.isNaN) => typeof globalThis.isNaN;
export declare const a4: (isNaN: number) => typeof globalThis.isNaN;
export declare const aObj: {
    a1: (isNaN: typeof globalThis.isNaN) => typeof globalThis.isNaN;
    a2: (isNaN: typeof globalThis.isNaN, bar?: typeof globalThis.isNaN) => typeof globalThis.isNaN;
    a3: (isNaN: number, bar: typeof globalThis.isNaN) => typeof globalThis.isNaN;
    a4: (isNaN: number) => typeof globalThis.isNaN;
};
export type a4Return = ReturnType<ReturnType<typeof a4>>;
export type a4oReturn = ReturnType<ReturnType<typeof aObj['a4']>>;
export declare const b1: (isNaN: typeof globalThis.isNaN) => typeof globalThis.isNaN;
export declare const b2: (isNaN: typeof globalThis.isNaN, bar?: typeof globalThis.isNaN) => typeof globalThis.isNaN;
export declare const b3: (isNaN: number, bar: typeof globalThis.isNaN) => typeof globalThis.isNaN;
export declare const b4: (isNaN: number) => typeof globalThis.isNaN;
export declare const bObj: {
    b1: (isNaN: typeof globalThis.isNaN) => typeof globalThis.isNaN;
    b2: (isNaN: typeof globalThis.isNaN, bar?: typeof globalThis.isNaN) => typeof globalThis.isNaN;
    b3: (isNaN: number, bar: typeof globalThis.isNaN) => typeof globalThis.isNaN;
    b4: (isNaN: number) => typeof globalThis.isNaN;
};
export type b4Return = ReturnType<ReturnType<typeof b4>>;
export type b4oReturn = ReturnType<ReturnType<typeof bObj['b4']>>;
export declare function c1(isNaN: typeof globalThis.isNaN): typeof globalThis.isNaN;
export declare function c2(isNaN: typeof globalThis.isNaN, bar?: typeof globalThis.isNaN): typeof globalThis.isNaN;
export declare function c3(isNaN: number, bar: typeof globalThis.isNaN): typeof globalThis.isNaN;
export declare function c4(isNaN: number): typeof globalThis.isNaN;
export declare const cObj: {
    c1(isNaN: typeof globalThis.isNaN): typeof globalThis.isNaN;
    c2(isNaN: typeof globalThis.isNaN, bar?: typeof globalThis.isNaN): typeof globalThis.isNaN;
    c3(isNaN: number, bar: typeof globalThis.isNaN): typeof globalThis.isNaN;
    c4(isNaN: number): typeof globalThis.isNaN;
};
export type c4Return = ReturnType<ReturnType<typeof c4>>;
export type c4oReturn = ReturnType<ReturnType<typeof cObj['c4']>>;
export declare function d1(): () => (isNaN: typeof globalThis.isNaN) => typeof globalThis.isNaN;
export declare function d2(): () => (isNaN: typeof globalThis.isNaN, bar?: typeof globalThis.isNaN) => typeof globalThis.isNaN;
export declare function d3(): () => (isNaN: number, bar: typeof globalThis.isNaN) => typeof globalThis.isNaN;
export declare function d4(): () => (isNaN: number) => typeof globalThis.isNaN;
export type d4Return = ReturnType<ReturnType<ReturnType<ReturnType<typeof d4>>>>;
export declare class A {
    method1(isNaN: typeof globalThis.isNaN): typeof globalThis.isNaN;
    method2(isNaN: typeof globalThis.isNaN, bar?: typeof globalThis.isNaN): typeof globalThis.isNaN;
    method3(isNaN: number, bar: typeof globalThis.isNaN): typeof globalThis.isNaN;
    method4(isNaN: number): typeof globalThis.isNaN;
}
export declare function fromParameter(isNaN: number, bar: typeof globalThis.isNaN): () => {
    bar: typeof globalThis.isNaN;
};
export declare const explicitlyTypedVariable: (isNaN: typeof globalThis.isNaN) => typeof globalThis.isNaN;
export declare function explicitlyTypedFunction(isNaN: typeof globalThis.isNaN): typeof globalThis.isNaN;
export type AsObjectProperty = {
    isNaN: typeof globalThis.isNaN;
};
export declare class AsClassProperty {
    isNaN?: typeof globalThis.isNaN;
}
export type AsFunctionType = (isNaN: typeof globalThis.isNaN) => typeof globalThis.isNaN;
