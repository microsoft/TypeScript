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



//// [enumConstantMemberWithStringEmitDeclaration.d.ts]
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
