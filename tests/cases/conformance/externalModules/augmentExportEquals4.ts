// @strict: true
// @filename: /node_modules/foo/index.d.ts
// @ts-ignore
export = foo;
declare namespace foo {
    export type T = number;
    export interface I { x: number; }
    export const val: string;
}

// @filename: /a.ts
import * as foo from "foo";

// Augmenting module "foo" - T should be visible via export= chain
// Previously Corsa reported TS4060: Return type has private name 'T'
declare module "foo" {
    export function f(): T; // Should be OK - T is accessible via export= foo
    export function g(): I; // Should be OK
    export const h: typeof val; // Should be OK
}

// Usage should work
let x: foo.T = 42;
let y: ReturnType<typeof foo.f> = 42;

// @filename: /b.ts
// Test that normal export= still works
import foo2 = require("foo");
let z: foo2.T = 42;

// @filename: /c.ts
// Test augmentation with export= in same file
declare namespace bar {
    export type U = string;
}
export = bar;
declare module "./c" {
    export function getU(): U; // Should be OK via export= bar
}
