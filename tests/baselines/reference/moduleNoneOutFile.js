//// [tests/cases/compiler/moduleNoneOutFile.ts] ////

//// [first.ts]
class Foo {}
//// [second.ts]
class Bar extends Foo {}

//// [bundle.js]
class Foo {
}
class Bar extends Foo {
}
