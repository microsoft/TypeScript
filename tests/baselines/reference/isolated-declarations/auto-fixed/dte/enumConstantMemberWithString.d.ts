//// [tests/cases/conformance/enums/enumConstantMemberWithString.ts] ////

//// [enumConstantMemberWithString.ts]
enum T1 {
    a = "1",
    b = "1" + "2",
    c = "1" + "2" + "3",
    d = "a" - "a",
    e = "a" + 1
}

enum T2 {
    a = "1",
    b = "1" + "2"
}

enum T3 {
    a = "1",
    b = "1" + "2",
    c = 1,
    d = 1 + 2
}

enum T4 {
    a = "1"
}

enum T5 {
    a = "1" + "2"
}

declare enum T6 {
    a = "1",
    b = "1" + "2"
}


/// [Declarations] ////



//// [enumConstantMemberWithString.d.ts]
declare enum T1 {
    a = "1",
    b = "12",
    c = "123",
    d,
    e = "a1"
}
declare enum T2 {
    a = "1",
    b = "12"
}
declare enum T3 {
    a = "1",
    b = "12",
    c = 1,
    d = 3
}
declare enum T4 {
    a = "1"
}
declare enum T5 {
    a = "12"
}
declare enum T6 {
    a = "1",
    b = "12"
}

/// [Errors] ////

enumConstantMemberWithString.ts(3,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumConstantMemberWithString.ts(4,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumConstantMemberWithString.ts(5,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumConstantMemberWithString.ts(5,9): error TS2362: The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
enumConstantMemberWithString.ts(5,15): error TS2363: The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
enumConstantMemberWithString.ts(6,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumConstantMemberWithString.ts(11,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumConstantMemberWithString.ts(16,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumConstantMemberWithString.ts(18,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumConstantMemberWithString.ts(26,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumConstantMemberWithString.ts(31,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== enumConstantMemberWithString.ts (11 errors) ====
    enum T1 {
        a = "1",
        b = "1" + "2",
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        c = "1" + "2" + "3",
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        d = "a" - "a",
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            ~~~
!!! error TS2362: The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
                  ~~~
!!! error TS2363: The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
        e = "a" + 1
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    enum T2 {
        a = "1",
        b = "1" + "2"
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    enum T3 {
        a = "1",
        b = "1" + "2",
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        c = 1,
        d = 1 + 2
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    enum T4 {
        a = "1"
    }
    
    enum T5 {
        a = "1" + "2"
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    declare enum T6 {
        a = "1",
        b = "1" + "2"
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    