//// [tests/cases/compiler/noImplicitAnyAndPrivateMembersWithoutTypeAnnotations.ts] ////

//// [test.d.ts]
declare class Something
{
    private static someStaticVar;
    private someVar;
}

//// [app.ts]
/// <reference path="test.d.ts" />
var x = new Something();


//// [app.js]
var x = new Something();
