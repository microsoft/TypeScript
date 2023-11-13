//// [tests/cases/conformance/types/typeRelationships/comparable/equalityWithEnumTypes.ts] ////

//// [equalityWithEnumTypes.ts]
// Literal enum type
enum E1 {
    a = 1,
    b = 2,
}

// Numeric enum type
enum E2 {
    a = 1 << 0,
    b = 1 << 1
}

function f1(v: E1): void {
    if (v !== 0) {  // Error
        v;
    }
    if (v !== 1) {
        v;
    }
    if (v !== 2) {
        v;
    }
    if (v !== 3) {  // Error
        v;
    }
}

function f2(v: E2): void {
    if (v !== 0) {
        v;
    }
    if (v !== 1) {
        v;
    }
    if (v !== 2) {
        v;
    }
    if (v !== 3) {
        v;
    }
}


/// [Declarations] ////



//// [equalityWithEnumTypes.d.ts]
declare enum E1 {
    a = 1,
    b = 2
}
declare enum E2 {
    a = 1,
    b = 2
}
declare function f1(v: E1): void;
declare function f2(v: E2): void;
/// [Errors] ////

equalityWithEnumTypes.ts(9,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
equalityWithEnumTypes.ts(10,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
equalityWithEnumTypes.ts(14,9): error TS2367: This comparison appears to be unintentional because the types 'E1' and '0' have no overlap.
equalityWithEnumTypes.ts(23,9): error TS2367: This comparison appears to be unintentional because the types 'E1' and '3' have no overlap.
equalityWithEnumTypes.ts(29,9): error TS2367: This comparison appears to be unintentional because the types 'E2' and '0' have no overlap.
equalityWithEnumTypes.ts(38,9): error TS2367: This comparison appears to be unintentional because the types 'E2' and '3' have no overlap.


==== equalityWithEnumTypes.ts (6 errors) ====
    // Literal enum type
    enum E1 {
        a = 1,
        b = 2,
    }
    
    // Numeric enum type
    enum E2 {
        a = 1 << 0,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        b = 1 << 1
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    function f1(v: E1): void {
        if (v !== 0) {  // Error
            ~~~~~~~
!!! error TS2367: This comparison appears to be unintentional because the types 'E1' and '0' have no overlap.
            v;
        }
        if (v !== 1) {
            v;
        }
        if (v !== 2) {
            v;
        }
        if (v !== 3) {  // Error
            ~~~~~~~
!!! error TS2367: This comparison appears to be unintentional because the types 'E1' and '3' have no overlap.
            v;
        }
    }
    
    function f2(v: E2): void {
        if (v !== 0) {
            ~~~~~~~
!!! error TS2367: This comparison appears to be unintentional because the types 'E2' and '0' have no overlap.
            v;
        }
        if (v !== 1) {
            v;
        }
        if (v !== 2) {
            v;
        }
        if (v !== 3) {
            ~~~~~~~
!!! error TS2367: This comparison appears to be unintentional because the types 'E2' and '3' have no overlap.
            v;
        }
    }
    