//// [tests/cases/conformance/enums/enumConstantMemberWithStringEmitDeclaration.ts] ////

//// [enumConstantMemberWithStringEmitDeclaration.ts]
enum T1 {
    a = "1",
    b = "1" + "2",
    c = "1" + "2" + "3"
}

enum T2 {
    a = "1",
    b = "1" + "2"
}

enum T3 {
    a = "1",
    b = "1" + "2"
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



//// [/.src/enumConstantMemberWithStringEmitDeclaration.d.ts]
declare enum T1 {
    a = "1",
    b = "12",
    c = "123"
}
declare enum T2 {
    a = "1",
    b = "12"
}
declare enum T3 {
    a = "1",
    b = "12"
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

enumConstantMemberWithStringEmitDeclaration.ts(3,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumConstantMemberWithStringEmitDeclaration.ts(4,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumConstantMemberWithStringEmitDeclaration.ts(9,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumConstantMemberWithStringEmitDeclaration.ts(14,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumConstantMemberWithStringEmitDeclaration.ts(22,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumConstantMemberWithStringEmitDeclaration.ts(27,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== enumConstantMemberWithStringEmitDeclaration.ts (6 errors) ====
    enum T1 {
        a = "1",
        b = "1" + "2",
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        c = "1" + "2" + "3"
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
        b = "1" + "2"
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
    