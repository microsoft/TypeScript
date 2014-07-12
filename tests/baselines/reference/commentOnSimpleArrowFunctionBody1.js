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
Foo(function () { return 127; });
