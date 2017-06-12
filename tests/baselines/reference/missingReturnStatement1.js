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
    var proto_1 = Foo.prototype;
    proto_1.foo = function () {
        //return 4;
    };
    return Foo;
}());
