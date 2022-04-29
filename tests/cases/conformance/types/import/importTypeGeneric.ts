// @declaration: true
// @target: es6
// @filename: a.d.ts
export interface Foo {
    a: string;
}
// @filename: b.d.ts
export interface Foo {
    a: number;
}
// @filename: usage.ts
export function getFooFrom<T extends "./a" | "./b">(v: T): import(T).Foo {
    return undefined as any;
}

export function getFooValueFrom<T extends "./a" | "./b">(v: T): import(T).Foo["a"] {
    return undefined as any;
}
