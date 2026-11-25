//// [tests/cases/compiler/declarationEmitNonIdentifierExportName.ts] ////

//// [dep.ts]
interface A { x: number }
interface C { y: number }
export { A as "a b", C as "a c", C as Ok };

//// [mid.ts]
import { "a b" as B, "a c" as C } from "./dep";
export declare function f(): B;
export declare function g(): C;

//// [main.ts]
import { f, g } from "./mid";
export const v = f();
export const w = g();


//// [dep.js]
export {};
//// [mid.js]
export {};
//// [main.js]
import { f, g } from "./mid";
export const v = f();
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
//// [main.d.ts]
export declare const v: import("./dep").a b;
export declare const w: import("./dep").a c;


//// [DtsFileErrors]


main.d.ts(1,41): error TS2694: Namespace '"dep"' has no exported member 'a'.
main.d.ts(1,43): error TS1005: ',' expected.
main.d.ts(1,43): error TS7005: Variable 'b' implicitly has an 'any' type.
main.d.ts(2,41): error TS2694: Namespace '"dep"' has no exported member 'a'.
main.d.ts(2,43): error TS1005: ',' expected.
main.d.ts(2,43): error TS7005: Variable 'c' implicitly has an 'any' type.


==== dep.d.ts (0 errors) ====
    interface A {
        x: number;
    }
    interface C {
        y: number;
    }
    export { A as "a b", C as "a c", C as Ok };
    
==== mid.d.ts (0 errors) ====
    import { "a b" as B, "a c" as C } from "./dep";
    export declare function f(): B;
    export declare function g(): C;
    
==== main.d.ts (6 errors) ====
    export declare const v: import("./dep").a b;
                                            ~
!!! error TS2694: Namespace '"dep"' has no exported member 'a'.
                                              ~
!!! error TS1005: ',' expected.
                                              ~
!!! error TS7005: Variable 'b' implicitly has an 'any' type.
    export declare const w: import("./dep").a c;
                                            ~
!!! error TS2694: Namespace '"dep"' has no exported member 'a'.
                                              ~
!!! error TS1005: ',' expected.
                                              ~
!!! error TS7005: Variable 'c' implicitly has an 'any' type.
    