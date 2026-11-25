//// [tests/cases/compiler/declarationEmitNonIdentifierExportNameBarrel.ts] ////

//// [a.d.ts]
interface A { x: number }
export { A as Ok };

//// [index.d.ts]
export { Ok as "a b" } from "./src/internal/a";

//// [index.d.ts]
import { Ok } from "dep/src/internal/a";
export declare function f(): Ok;

//// [main.ts]
import { f } from "mid";
export const v = f();


//// [main.js]
import { f } from "mid";
export const v = f();


//// [main.d.ts]
export declare const v: import("dep").a b;


//// [DtsFileErrors]


main.d.ts(1,39): error TS2694: Namespace '"node_modules/dep/index"' has no exported member 'a'.
main.d.ts(1,41): error TS1005: ',' expected.
main.d.ts(1,41): error TS7005: Variable 'b' implicitly has an 'any' type.


==== node_modules/dep/src/internal/a.d.ts (0 errors) ====
    interface A { x: number }
    export { A as Ok };
    
==== node_modules/dep/index.d.ts (0 errors) ====
    export { Ok as "a b" } from "./src/internal/a";
    
==== node_modules/mid/index.d.ts (0 errors) ====
    import { Ok } from "dep/src/internal/a";
    export declare function f(): Ok;
    
==== main.d.ts (3 errors) ====
    export declare const v: import("dep").a b;
                                          ~
!!! error TS2694: Namespace '"node_modules/dep/index"' has no exported member 'a'.
                                            ~
!!! error TS1005: ',' expected.
                                            ~
!!! error TS7005: Variable 'b' implicitly has an 'any' type.
    