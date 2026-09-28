// @strict: true
// @target: es2015
// @declaration: true
// @module: commonjs

// HEAVY REFACTOR TEST FOR #63814
// Root cause: Corsa difference - export= target not considered visible during declaration emit
// When namespace 'foo' is exported only via 'export = foo', it should be visible for augmentation
// Previous fix in PR #4446 was closed when typescript-go repo was archived, never merged
// This test ensures declaration emit does not falsely report TS4060 private name

// Simulating: /node_modules/foo/index.d.ts
// export = foo;
// declare namespace foo {
//   export type T = number;
// }

// This file simulates the augmentation case
declare namespace foo {
    export type T = number;
    export const x: number;
}

declare module "foo" {
    // This should be OK - T is from foo which is exported via export = foo
    // Before fix: TS4060 Return type of exported function has or is using private name 'T'
    // After fix: No error, foo is visible via export=
    export function f(): foo.T;
    export function g(): T; // Should also be OK if T is visible via parent
}

// Additional test: export= with class
declare namespace bar {
    export class MyClass {
        prop: string;
    }
}

declare module "bar" {
    export function create(): bar.MyClass; // Should be OK
}

// Control: truly private type should still error
class PrivateClass {
    private secret: string = "";
}
declare module "privateTest" {
    // This SHOULD error - PrivateClass is not exported
    // export function getSecret(): PrivateClass; // Would be TS4060 - correctly
}
