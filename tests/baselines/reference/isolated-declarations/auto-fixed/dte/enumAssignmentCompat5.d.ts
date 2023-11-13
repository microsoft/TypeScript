//// [tests/cases/compiler/enumAssignmentCompat5.ts] ////

//// [enumAssignmentCompat5.ts]
enum E {
    A, B, C
}
enum Computed {
    A = 1 << 1,
    B = 1 << 2,
    C = 1 << 3,
}
let n: number;
let e: E = n; // ok because it's too inconvenient otherwise
e = 0; // ok, in range
e = 4; // ok, out of range, but allowed computed enums don't have all members
let a: E.A = 0; // ok, A === 0
a = 2; // error, 2 !== 0
a = n; // ok

let c: Computed = n; // ok
c = n; // ok
c = 4; // ok
let ca: Computed.A = 1; // error, Computed.A isn't a literal type because Computed has no enum literals





/// [Declarations] ////



//// [enumAssignmentCompat5.d.ts]
declare enum E {
    A = 0,
    B = 1,
    C = 2
}
declare enum Computed {
    A = 2,
    B = 4,
    C = 8
}
declare let n: number;
declare let e: E;
declare let a: E.A;
declare let c: Computed;
declare let ca: Computed.A;
/// [Errors] ////

enumAssignmentCompat5.ts(5,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumAssignmentCompat5.ts(6,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumAssignmentCompat5.ts(7,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumAssignmentCompat5.ts(12,1): error TS2322: Type '4' is not assignable to type 'E'.
enumAssignmentCompat5.ts(14,1): error TS2322: Type '2' is not assignable to type 'E.A'.
enumAssignmentCompat5.ts(20,5): error TS2322: Type '1' is not assignable to type 'Computed.A'.


==== enumAssignmentCompat5.ts (6 errors) ====
    enum E {
        A, B, C
    }
    enum Computed {
        A = 1 << 1,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        B = 1 << 2,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        C = 1 << 3,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    let n: number;
    let e: E = n; // ok because it's too inconvenient otherwise
    e = 0; // ok, in range
    e = 4; // ok, out of range, but allowed computed enums don't have all members
    ~
!!! error TS2322: Type '4' is not assignable to type 'E'.
    let a: E.A = 0; // ok, A === 0
    a = 2; // error, 2 !== 0
    ~
!!! error TS2322: Type '2' is not assignable to type 'E.A'.
    a = n; // ok
    
    let c: Computed = n; // ok
    c = n; // ok
    c = 4; // ok
    let ca: Computed.A = 1; // error, Computed.A isn't a literal type because Computed has no enum literals
        ~~
!!! error TS2322: Type '1' is not assignable to type 'Computed.A'.
    
    
    
    