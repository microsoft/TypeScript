//// [tests/cases/compiler/enumWithoutInitializerAfterComputedMember.ts] ////

//// [enumWithoutInitializerAfterComputedMember.ts]
enum E {
    a,
    b = a,
    c
}

/// [Declarations] ////



//// [/.src/enumWithoutInitializerAfterComputedMember.d.ts]
declare enum E {
    a = 0,
    b = 0,
    c = 1
}
