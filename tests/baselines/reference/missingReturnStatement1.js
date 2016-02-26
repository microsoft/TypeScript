//// [missingReturnStatement1.ts]
class Foo {
    foo(): number {
        //return 4;
    }
}


//// [missingReturnStatement1.js]
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype.foo = function () {
        //return 4;
    };
    return Foo;
}());
