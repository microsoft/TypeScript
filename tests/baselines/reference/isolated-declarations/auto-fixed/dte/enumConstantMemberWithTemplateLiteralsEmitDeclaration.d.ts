//// [tests/cases/conformance/enums/enumConstantMemberWithTemplateLiteralsEmitDeclaration.ts] ////

//// [enumConstantMemberWithTemplateLiteralsEmitDeclaration.ts]
enum T1 {
    a = `1`
}

enum T2 {
    a = `1`,
    b = "2",
    c = 3
}

enum T3 {
    a = `1` + `1`
}

enum T4 {
    a = `1`,
    b = `1` + `1`,
    c = `1` + "2",
    d = "2" + `1`,
    e = "2" + `1` + `1`
}

enum T5 {
    a = `1`,
    b = `1` + `2`,
    c = `1` + `2` + `3`,
    d = 1
}

enum T6 {
    a = 1,
    b = `12`.length
}

declare enum T7 {
    a = `1`,
    b = `1` + `1`,
    c = "2" + `1`
}


/// [Declarations] ////



//// [enumConstantMemberWithTemplateLiteralsEmitDeclaration.d.ts]
declare enum T1 {
    a = "1"
}
declare enum T2 {
    a = "1",
    b = "2",
    c = 3
}
declare enum T3 {
    a = "11"
}
declare enum T4 {
    a = "1",
    b = "11",
    c = "12",
    d = "21",
    e = "211"
}
declare enum T5 {
    a = "1",
    b = "12",
    c = "123",
    d = 1
}
declare enum T6 {
    a = 1,
    b
}
declare enum T7 {
    a = "1",
    b = "11",
    c = "21"
}
/// [Errors] ////

enumConstantMemberWithTemplateLiteralsEmitDeclaration.ts(32,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== enumConstantMemberWithTemplateLiteralsEmitDeclaration.ts (1 errors) ====
    enum T1 {
        a = `1`
    }
    
    enum T2 {
        a = `1`,
        b = "2",
        c = 3
    }
    
    enum T3 {
        a = `1` + `1`
    }
    
    enum T4 {
        a = `1`,
        b = `1` + `1`,
        c = `1` + "2",
        d = "2" + `1`,
        e = "2" + `1` + `1`
    }
    
    enum T5 {
        a = `1`,
        b = `1` + `2`,
        c = `1` + `2` + `3`,
        d = 1
    }
    
    enum T6 {
        a = 1,
        b = `12`.length
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    declare enum T7 {
        a = `1`,
        b = `1` + `1`,
        c = "2" + `1`
    }
    