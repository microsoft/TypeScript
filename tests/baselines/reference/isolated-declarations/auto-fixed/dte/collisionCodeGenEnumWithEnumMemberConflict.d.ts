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
/// [Errors] ////

collisionCodeGenEnumWithEnumMemberConflict.ts(3,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== collisionCodeGenEnumWithEnumMemberConflict.ts (1 errors) ====
    enum Color {
        Color,
        Thing = Color
        ~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }