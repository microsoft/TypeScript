//// [tests/cases/compiler/declarationEmitNonIdentifierExportNameNamespaceImport.ts] ////

//// [dep.ts]
interface A { x: number }
interface C { y: number }
export { A as "a b", C as "a c", C as Ok };

//// [mid.ts]
import { "a b" as B, "a c" as C } from "./dep";
export declare function f(): B;
export declare function g(): C;

//// [main1.ts]
import * as dep from "./dep";
import { f } from "./mid";
export const v = f();

//// [main2.ts]
import * as dep from "./dep";
import { g } from "./mid";
export const w = g();


//// [dep.js]
export {};
//// [mid.js]
export {};
//// [main1.js]
import { f } from "./mid";
export const v = f();
//// [main2.js]
import { g } from "./mid";
export const w = g();


//// [dep.d.ts]
interface A {
    x: number;
}
interface C {
    y: number;
}
export { A as "a b", C as "a c", C as Ok };
//// [mid.d.ts]
import { "a b" as B, "a c" as C } from "./dep";
export declare function f(): B;
export declare function g(): C;
//// [main1.d.ts]
import * as dep from "./dep";
export declare const v: dep."a b";
//// [main2.d.ts]
import * as dep from "./dep";
export declare const w: dep."a c";


//// [DtsFileErrors]


/main1.d.ts(2,29): error TS1003: Identifier expected.
/main2.d.ts(2,29): error TS1003: Identifier expected.


==== /dep.d.ts (0 errors) ====
    interface A {
        x: number;
    }
    interface C {
        y: number;
    }
    export { A as "a b", C as "a c", C as Ok };
    
==== /mid.d.ts (0 errors) ====
    import { "a b" as B, "a c" as C } from "./dep";
    export declare function f(): B;
    export declare function g(): C;
    
==== /main1.d.ts (1 errors) ====
    import * as dep from "./dep";
    export declare const v: dep."a b";
                                ~~~~~
!!! error TS1003: Identifier expected.
    
==== /main2.d.ts (1 errors) ====
    import * as dep from "./dep";
    export declare const w: dep."a c";
                                ~~~~~
!!! error TS1003: Identifier expected.
    