//// [tests/cases/compiler/mergedDeclarations2.ts] ////

//// [mergedDeclarations2.ts]
enum Foo {
    b
}
enum Foo {
    a = b
}

module Foo {
    export var x = b
}

/// [Declarations] ////



//// [/.src/mergedDeclarations2.d.ts]
declare enum Foo {
    b = 0
}
declare enum Foo {
    a = 0
}
declare namespace Foo {
    var x: invalid;
}
/// [Errors] ////

mergedDeclarations2.ts(5,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
mergedDeclarations2.ts(9,20): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== mergedDeclarations2.ts (2 errors) ====
    enum Foo {
        b
    }
    enum Foo {
        a = b
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    module Foo {
        export var x = b
                       ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }