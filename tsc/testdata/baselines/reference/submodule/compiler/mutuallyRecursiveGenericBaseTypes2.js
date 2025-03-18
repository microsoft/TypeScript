//// [tests/cases/compiler/mutuallyRecursiveGenericBaseTypes2.ts] ////

//// [mutuallyRecursiveGenericBaseTypes2.ts]
class foo<T>
{
    bar(): foo2<T[]> { return null; }
}
 
class foo2<T> extends foo<T> {
}
 
var test = new foo<string>();


//// [mutuallyRecursiveGenericBaseTypes2.js]
class foo {
    bar() { return null; }
}
class foo2 extends foo {
}
var test = new foo();
