//// [tests/cases/compiler/lambdaASIEmit.ts] ////

//// [lambdaASIEmit.ts]
function Foo(x: any)
{
}
 
Foo(() =>
    // do something
    127);


//// [lambdaASIEmit.js]
function Foo(x) {
}
Foo(function () {
    // do something
    return 127;
});
