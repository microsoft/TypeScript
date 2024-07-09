//// [tests/cases/conformance/parser/ecmascript5/Generics/parserGenericsInVariableDeclaration1.ts] ////

//// [parserGenericsInVariableDeclaration1.ts]
var v : Foo<T> = 1;
var v : Foo<T>= 1;

var v : Foo<Bar<T>> = 1;
var v : Foo<Bar<T>>= 1;

var v : Foo<Bar<Quux<T>>> = 1;
var v : Foo<Bar<Quux<T>>>= 1;

//// [parserGenericsInVariableDeclaration1.js]
var v = 1;
var v = 1;
var v = 1;
var v = 1;
var v = 1;
var v = 1;
