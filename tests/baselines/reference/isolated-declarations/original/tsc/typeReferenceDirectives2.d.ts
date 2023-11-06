//// [tests/cases/compiler/typeReferenceDirectives2.ts] ////

//// [/app.ts]
interface A {
    x: $
}
//// [/types/lib/index.d.ts]
interface $ { x }


/// [Declarations] ////



//// [/app.d.ts]
interface A {
    x: $;
}
/// [Errors] ////

/app.ts(2,8): error TS9008: Declaration emit for this file requires adding a type reference directive. Add a type reference directive to lib to unblock declaration emit.


==== /app.ts (1 errors) ====
    interface A {
        x: $
           ~
!!! error TS9008: Declaration emit for this file requires adding a type reference directive. Add a type reference directive to lib to unblock declaration emit.
    }
==== /types/lib/index.d.ts (0 errors) ====
    interface $ { x }
    