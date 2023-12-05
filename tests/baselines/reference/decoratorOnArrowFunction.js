//// [tests/cases/conformance/decorators/invalid/decoratorOnArrowFunction.ts] ////

//// [decoratorOnArrowFunction.ts]
declare function dec<T>(target: T): T;

var F = @dec () => {
}

//// [decoratorOnArrowFunction.js]
var F = ;
{
}
