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
declare module "index" {
    export {};
}
declare module "nested/derived" {
    export function g(): import("nested").C;
}
declare module "nested/index" {
    export * from "nested/base";
    export * from "nested/derived";
    export class C {
    }
}
declare module "nested/base" {
    import { C } from "nested/index";
    export function f(): C;
}


//// [DtsFileErrors]


dist/out.d.ts(5,33): error TS2307: Cannot find module 'nested' or its corresponding type declarations.


==== ./dist/out.d.ts (1 errors) ====
    declare module "index" {
        export {};
    }
    declare module "nested/derived" {
        export function g(): import("nested").C;
                                    ~~~~~~~~
!!! error TS2307: Cannot find module 'nested' or its corresponding type declarations.
    }
    declare module "nested/index" {
        export * from "nested/base";
        export * from "nested/derived";
        export class C {
        }
    }
    declare module "nested/base" {
        import { C } from "nested/index";
        export function f(): C;
    }
    