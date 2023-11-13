//// [tests/cases/compiler/mergedDeclarations2.ts] ////

//// [mergedDeclarations2.ts]
enum Foo {
    b
}
enum Foo {
    a = b
}

module Foo {
    export var x: any = b
}

/// [Declarations] ////



//// [mergedDeclarations2.d.ts]
declare enum Foo {
    b = 0
}
declare enum Foo {
    a = 0
}
declare namespace Foo {
    var x: any;
}
/// [Errors] ////

mergedDeclarations2.ts(9,25): error TS2304: Cannot find name 'b'.


==== mergedDeclarations2.ts (1 errors) ====
    enum Foo {
        b
    }
    enum Foo {
        a = b
    }
    
    module Foo {
        export var x: any = b
                            ~
!!! error TS2304: Cannot find name 'b'.
    }