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
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
var Bar = 3;
//// [file2.js]
var Bar = /** @class */ (function () {
    function Bar() {
    }
    return Bar;
}());
//// [file3.js]
var Bar = 42;
