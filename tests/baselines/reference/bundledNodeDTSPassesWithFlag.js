//// [tests/cases/conformance/declarationEmit/bundledNodeDTSPassesWithFlag.ts] ////

//// [index.ts]
export * from "./nested";

//// [base.ts]
import { B } from "./shared";

export function f() {
    return new B();
}

//// [derived.ts]
import { f } from "./base";

export function g() {
    return f();
}

//// [index.ts]
export * from "./base";
export * from "./derived";
export * from "./shared";

//// [shared.ts]
export class B {}




//// [out.d.ts]
declare module "my-pkg/nested/shared" {
    export class B {
    }
}
declare module "my-pkg/nested/base" {
    import { B } from "my-pkg/nested/shared";
    export function f(): B;
}
declare module "my-pkg/nested/derived" {
    export function g(): import("my-pkg").B;
}
declare module "my-pkg/nested" {
    export * from "my-pkg/nested/base";
    export * from "my-pkg/nested/derived";
    export * from "my-pkg/nested/shared";
}
declare module "my-pkg" {
    export * from "my-pkg/nested";
}
