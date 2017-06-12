//// [incompatibleAssignmentOfIdenticallyNamedTypes.ts]
interface T { }
declare const a: T;
class Foo<T> {
    x: T;
    fn() {
        this.x = a;
    }
}


//// [incompatibleAssignmentOfIdenticallyNamedTypes.js]
var Foo = (function () {
    function Foo() {
    }
    var proto_1 = Foo.prototype;
    proto_1.fn = function () {
        this.x = a;
    };
    return Foo;
}());
