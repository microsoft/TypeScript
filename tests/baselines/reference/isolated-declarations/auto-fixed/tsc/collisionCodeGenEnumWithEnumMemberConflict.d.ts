//// [tests/cases/compiler/collisionCodeGenEnumWithEnumMemberConflict.ts] ////

//// [collisionCodeGenEnumWithEnumMemberConflict.ts]
enum Color {
    Color,
    Thing = Color
}

/// [Declarations] ////



//// [collisionCodeGenEnumWithEnumMemberConflict.d.ts]
declare enum Color {
    Color = 0,
    Thing = 0
}
