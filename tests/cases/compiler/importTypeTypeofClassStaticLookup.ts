// @filename: a.d.ts
export declare class A {
    static foo(): void;
}

// @filename: index.d.ts
export const foo: typeof import("./a").A.foo;