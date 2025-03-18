//// [tests/cases/compiler/emptyTypeArgumentListWithNew.ts] ////

//// [emptyTypeArgumentListWithNew.ts]
class foo<T> { }
new foo<>();

// https://github.com/microsoft/TypeScript/issues/33041
class noParams {}
new noParams<>();

//// [emptyTypeArgumentListWithNew.js]
class foo {
}
new foo();
class noParams {
}
new noParams();
