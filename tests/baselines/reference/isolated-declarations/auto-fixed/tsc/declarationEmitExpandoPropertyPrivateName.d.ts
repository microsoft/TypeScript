//// [tests/cases/compiler/declarationEmitExpandoPropertyPrivateName.ts] ////

//// [a.ts]
interface I {}
export function f(): I { return null as I; }
//// [b.ts]
import {f} from "./a";

export function q(): void {}
q.val = f();


/// [Declarations] ////



//// [a.d.ts]
interface I {
}
export declare function f(): I;
export {};

//// [b.d.ts]
export declare function q(): void;
export declare namespace q {
    var val: I;
}
/// [Errors] ////

b.ts(4,1): error TS4032: Property 'val' of exported interface has or is using name 'I' from private module '"a"'.


==== a.ts (0 errors) ====
    interface I {}
    export function f(): I { return null as I; }
==== b.ts (1 errors) ====
    import {f} from "./a";
    
    export function q(): void {}
    q.val = f();
    ~~~~~
!!! error TS4032: Property 'val' of exported interface has or is using name 'I' from private module '"a"'.
    