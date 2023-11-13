//// [tests/cases/compiler/declFileEnums.ts] ////

//// [declFileEnums.ts]
enum e1 {
    a,
    b,
    c
}

enum e2 {
    a = 10,
    b = a + 2,
    c = 10,
}

enum e3 {
    a = 10,
    b = Math.PI,
    c = a + 3
}

enum e4 {
    a,
    b,
    c,
    d = 10,
    e
}

enum e5 {
    "Friday",
    "Saturday",
    "Sunday",
    "Weekend days"
}




/// [Declarations] ////



//// [declFileEnums.d.ts]
declare enum e1 {
    a = 0,
    b = 1,
    c = 2
}
declare enum e2 {
    a = 10,
    b = 12,
    c = 10
}
declare enum e3 {
    a = 10,
    b,
    c = 13
}
declare enum e4 {
    a = 0,
    b = 1,
    c = 2,
    d = 10,
    e = 11
}
declare enum e5 {
    "Friday" = 0,
    "Saturday" = 1,
    "Sunday" = 2,
    "Weekend days" = 3
}

/// [Errors] ////

declFileEnums.ts(15,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== declFileEnums.ts (1 errors) ====
    enum e1 {
        a,
        b,
        c
    }
    
    enum e2 {
        a = 10,
        b = a + 2,
        c = 10,
    }
    
    enum e3 {
        a = 10,
        b = Math.PI,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        c = a + 3
    }
    
    enum e4 {
        a,
        b,
        c,
        d = 10,
        e
    }
    
    enum e5 {
        "Friday",
        "Saturday",
        "Sunday",
        "Weekend days"
    }
    
    
    