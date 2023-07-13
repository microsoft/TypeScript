//// [tests/cases/compiler/commentOnSimpleArrowFunctionBody1.ts] ////

//// [commentOnSimpleArrowFunctionBody1.ts]
function Foo(x: any)
{
}
 
Foo(() =>
    // do something
    127);


//// [commentOnSimpleArrowFunctionBody1.js]
function Foo(x) {
}
Foo(function () {
    // do something
    return 127;
});
