//// [a.ts] ////
export type SpecialString = string;
type PrivateSpecialString = string;

export namespace N {
    export type SpecialString = string;
}
export const o = (p1: SpecialString, p2: PrivateSpecialString, p3: N.SpecialString) => null! as { foo: SpecialString, bar: PrivateSpecialString, baz: N.SpecialString };
//// [b.ts] ////
import * as a from "./a";
export const g = a.o
//// [c.ts] ////
import { o, SpecialString } from "./a";
export const g = o
//// [a.d.ts] ////
export type SpecialString = string;
type PrivateSpecialString = string;
export declare namespace N {
    type SpecialString = string;
}
export declare const o: (p1: SpecialString, p2: PrivateSpecialString, p3: N.SpecialString) => {
    foo: SpecialString;
    bar: PrivateSpecialString;
    baz: N.SpecialString;
};
export {};
//// [b.d.ts] ////
export declare const g: any;


//// [Diagnostics reported]
b.ts(2,14): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.


==== b.ts (1 errors) ====
    import * as a from "./a";
    export const g = a.o
                 ~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 b.ts:2:14: Add a type annotation to the variable g.
    
//// [c.d.ts] ////
export declare const g: any;


//// [Diagnostics reported]
c.ts(2,14): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.


==== c.ts (1 errors) ====
    import { o, SpecialString } from "./a";
    export const g = o
                 ~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 c.ts:2:14: Add a type annotation to the variable g.
