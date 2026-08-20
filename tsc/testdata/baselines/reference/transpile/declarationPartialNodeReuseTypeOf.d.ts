//// [a.ts] ////
export const nImported = "nImported"
export const nNotImported = "nNotImported"
const nPrivate = "private"
export const o = (p1: typeof nImported, p2: typeof nNotImported, p3: typeof nPrivate) => null! as { foo: typeof nImported, bar: typeof nPrivate, baz: typeof nNotImported }
//// [b.ts] ////
import { o, nImported } from "./a";
export const g = o
console.log(nImported);
//// [c.ts] ////
import * as a from "./a";
export const g = a.o
//// [a.d.ts] ////
export declare const nImported = "nImported";
export declare const nNotImported = "nNotImported";
declare const nPrivate = "private";
export declare const o: (p1: typeof nImported, p2: typeof nNotImported, p3: typeof nPrivate) => {
    foo: typeof nImported;
    bar: typeof nPrivate;
    baz: typeof nNotImported;
};
export {};
//// [b.d.ts] ////
export declare const g: any;


//// [Diagnostics reported]
b.ts(2,14): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.


==== b.ts (1 errors) ====
    import { o, nImported } from "./a";
    export const g = o
                 ~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 b.ts:2:14: Add a type annotation to the variable g.
    console.log(nImported);
    
//// [c.d.ts] ////
export declare const g: any;


//// [Diagnostics reported]
c.ts(2,14): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.


==== c.ts (1 errors) ====
    import * as a from "./a";
    export const g = a.o
                 ~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 c.ts:2:14: Add a type annotation to the variable g.
    
