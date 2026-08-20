//// [tests/cases/conformance/types/import/importTypeGeneric.ts] ////

//// [a.d.ts]
export interface Foo {
    a: string;
}
//// [b.d.ts]
export interface Foo {
    a: number;
}
//// [usage.ts]
export function getFooFrom<T extends "./a" | "./b">(v: T): import(T).Foo {
    return undefined as any;
}

export function getFooValueFrom<T extends "./a" | "./b">(v: T): import(T).Foo["a"] {
    return undefined as any;
}


//// [usage.js]
export function getFooFrom(v) {
    return undefined;
}
export function getFooValueFrom(v) {
    return undefined;
}


//// [usage.d.ts]
export declare function getFooFrom<T extends "./a" | "./b">(v: T): import(T).Foo;
export declare function getFooValueFrom<T extends "./a" | "./b">(v: T): import(T).Foo["a"];
