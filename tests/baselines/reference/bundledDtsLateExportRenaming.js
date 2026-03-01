//// [tests/cases/compiler/bundledDtsLateExportRenaming.ts] ////

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
declare module "nested/shared" {
    export class B {
    }
}
declare module "nested/base" {
    import { B } from "nested/shared";
    export function f(): B;
}
declare module "nested/derived" {
    export function g(): import("nested").B;
}
declare module "nested/index" {
    export * from "nested/base";
    export * from "nested/derived";
    export * from "nested/shared";
}
declare module "index" {
    export * from "nested/index";
}
