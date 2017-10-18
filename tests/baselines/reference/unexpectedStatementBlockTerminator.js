//// [unexpectedStatementBlockTerminator.ts]
class Foo {}

class Bar {}
case

function Goo() {return {a:1,b:2};}


//// [unexpectedStatementBlockTerminator.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
var Bar = /** @class */ (function () {
    function Bar() {
    }
    return Bar;
}());
function Goo() { return { a: 1, b: 2 }; }
