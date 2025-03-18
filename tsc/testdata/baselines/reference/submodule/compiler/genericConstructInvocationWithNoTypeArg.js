//// [tests/cases/compiler/genericConstructInvocationWithNoTypeArg.ts] ////

//// [genericConstructInvocationWithNoTypeArg.ts]
interface Foo<T> {
   new (x: number): Foo<T>;
}
var f2: Foo<number> = new Foo(3);


//// [genericConstructInvocationWithNoTypeArg.js]
var f2 = new Foo(3);
