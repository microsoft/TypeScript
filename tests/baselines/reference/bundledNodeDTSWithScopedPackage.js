//// [tests/cases/conformance/declarationEmit/bundledNodeDTSWithScopedPackage.ts] ////

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
declare module "@test/my-pkg/nested/shared" {
    export class B {
    }
}
declare module "@test/my-pkg/nested/base" {
    import { B } from "@test/my-pkg/nested/shared";
    export function f(): B;
}
declare module "@test/my-pkg/nested/derived" {
    export function g(): import("@test/my-pkg").B;
}
declare module "@test/my-pkg/nested" {
    export * from "@test/my-pkg/nested/base";
    export * from "@test/my-pkg/nested/derived";
    export * from "@test/my-pkg/nested/shared";
}
declare module "@test/my-pkg" {
    export * from "@test/my-pkg/nested";
}
