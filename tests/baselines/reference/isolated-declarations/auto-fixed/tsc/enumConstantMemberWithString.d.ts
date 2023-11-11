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



//// [/.src/enumConstantMemberWithString.d.ts]
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

enumConstantMemberWithString.ts(5,9): error TS2362: The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
enumConstantMemberWithString.ts(5,15): error TS2363: The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.


==== enumConstantMemberWithString.ts (2 errors) ====
    enum T1 {
        a = "1",
        b = "1" + "2",
        c = "1" + "2" + "3",
        d = "a" - "a",
            ~~~
!!! error TS2362: The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
                  ~~~
!!! error TS2363: The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
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
    