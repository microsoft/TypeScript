//// [tests/cases/compiler/duplicateIdentifierRelatedSpans1.ts] ////

//// [file1.ts]
class Foo { }
const Bar = 3;
//// [file2.ts]
type Foo = number;
class Bar {}
//// [file3.ts]
type Foo = 54;
let Bar = 42


//// [file1.js]
class Foo {
}
const Bar = 3;
//// [file2.js]
class Bar {
}
//// [file3.js]
let Bar = 42;
