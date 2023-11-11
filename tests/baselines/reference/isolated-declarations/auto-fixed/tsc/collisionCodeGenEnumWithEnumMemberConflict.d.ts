//// [tests/cases/compiler/collisionCodeGenEnumWithEnumMemberConflict.ts] ////

//// [collisionCodeGenEnumWithEnumMemberConflict.ts]
enum Color {
    Color,
    Thing = Color
}

/// [Declarations] ////



//// [/.src/collisionCodeGenEnumWithEnumMemberConflict.d.ts]
declare enum Color {
    Color = 0,
    Thing = 0
}
