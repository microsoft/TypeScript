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


//// [DtsFileErrors]


dist/out.d.ts(10,33): error TS2307: Cannot find module 'nested' or its corresponding type declarations.


==== dist/out.d.ts (1 errors) ====
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
                                    ~~~~~~~~
!!! error TS2307: Cannot find module 'nested' or its corresponding type declarations.
    }
    declare module "nested/index" {
        export * from "nested/base";
        export * from "nested/derived";
        export * from "nested/shared";
    }
    declare module "index" {
        export * from "nested/index";
    }
    