//// [tests/cases/compiler/genericLambaArgWithoutTypeArguments.ts] ////

//// [genericLambaArgWithoutTypeArguments.ts]
interface Foo<T> {
   x: T;
}
function foo(a) {
   return null;
}
foo((arg: Foo) => { return arg.x; });


//// [genericLambaArgWithoutTypeArguments.js]
function foo(a) {
    return null;
}
foo(function (arg) { return arg.x; });
