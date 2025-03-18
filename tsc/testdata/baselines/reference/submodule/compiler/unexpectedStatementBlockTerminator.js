//// [tests/cases/compiler/unexpectedStatementBlockTerminator.ts] ////

//// [unexpectedStatementBlockTerminator.ts]
class Foo {}

class Bar {}
case

function Goo() {return {a:1,b:2};}


//// [unexpectedStatementBlockTerminator.js]
class Foo {
}
class Bar {
}
function Goo() { return { a: 1, b: 2 }; }
