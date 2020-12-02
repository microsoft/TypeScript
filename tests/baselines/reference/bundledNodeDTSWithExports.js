//// [tests/cases/conformance/declarationEmit/bundledNodeDTSWithExports.ts] ////

//// [index.ts]
export {}

//// [base.ts]
import { C } from "./";

export function f() {
    return new C();
}

//// [derived.ts]
import { f } from "./base";

export function g() {
    return f();
}

//// [index.ts]
export * from "./base";
export * from "./derived";
export class C {}




//// [out.d.ts]
declare module "my-pkg" {
    export {};
}
declare module "my-pkg/nested/derived" {
    export function g(): import("my-pkg/nested").C;
}
declare module "my-pkg/nested" {
    export * from "my-pkg/nested/base";
    export * from "my-pkg/nested/derived";
    export class C {
    }
}
declare module "my-pkg/nested/base" {
    import { C } from "my-pkg/nested";
    export function f(): C;
}
