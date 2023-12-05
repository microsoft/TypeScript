//// [tests/cases/compiler/typeArgumentsOnFunctionsWithNoTypeParameters.ts] ////

//// [typeArgumentsOnFunctionsWithNoTypeParameters.ts]
function foo<T, U>(f: (v: T) => U) {
   var r1 = f<number>(1);
   var r2 = f(1);
   var r3 = f<any>(null);
   var r4 = f(null);
}


//// [typeArgumentsOnFunctionsWithNoTypeParameters.js]
function foo(f) {
    var r1 = f(1);
    var r2 = f(1);
    var r3 = f(null);
    var r4 = f(null);
}
