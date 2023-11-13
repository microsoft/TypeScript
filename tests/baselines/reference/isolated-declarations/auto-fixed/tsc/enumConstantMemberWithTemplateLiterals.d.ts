//// [tests/cases/conformance/enums/enumConstantMemberWithTemplateLiterals.ts] ////

//// [enumConstantMemberWithTemplateLiterals.ts]
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
    d = 1,
    e = `1` - `1`,
    f = `1` + 1,
    g = `1${"2"}3`,
    h = `1`.length
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



//// [enumConstantMemberWithTemplateLiterals.d.ts]
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
    d = 1,
    e,
    f = "11",
    g = "123",
    h
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

enumConstantMemberWithTemplateLiterals.ts(28,9): error TS2362: The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
enumConstantMemberWithTemplateLiterals.ts(28,15): error TS2363: The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.


==== enumConstantMemberWithTemplateLiterals.ts (2 errors) ====
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
        d = 1,
        e = `1` - `1`,
            ~~~
!!! error TS2362: The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
                  ~~~
!!! error TS2363: The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
        f = `1` + 1,
        g = `1${"2"}3`,
        h = `1`.length
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
    