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
    Foo.prototype.fn = function () {
        this.x = a;
    };
    return Foo;
}());
