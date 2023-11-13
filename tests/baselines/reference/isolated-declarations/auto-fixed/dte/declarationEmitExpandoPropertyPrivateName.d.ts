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
//# sourceMappingURL=a.d.ts.map

//// [b.d.ts]
export declare function q(): void;
//# sourceMappingURL=b.d.ts.map

/// [Errors] ////

b.ts(3,17): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
b.ts(4,1): error TS4032: Property 'val' of exported interface has or is using name 'I' from private module '"a"'.


==== a.ts (0 errors) ====
    interface I {}
    export function f(): I { return null as I; }
==== b.ts (2 errors) ====
    import {f} from "./a";
    
    export function q(): void {}
                    ~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    q.val = f();
    ~~~~~
!!! error TS4032: Property 'val' of exported interface has or is using name 'I' from private module '"a"'.
    