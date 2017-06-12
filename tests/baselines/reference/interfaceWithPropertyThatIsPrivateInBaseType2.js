//// [interfaceWithPropertyThatIsPrivateInBaseType2.ts]
class Base {
    private x() {}
}

interface Foo extends Base { // error
    x(): any;
}

class Base2<T> {
    private x() { }
}

interface Foo2<T> extends Base2<T> { // error
    x(): any;
}

//// [interfaceWithPropertyThatIsPrivateInBaseType2.js]
var Base = (function () {
    function Base() {
    }
    var proto_1 = Base.prototype;
    proto_1.x = function () { };
    return Base;
}());
var Base2 = (function () {
    function Base2() {
    }
    var proto_2 = Base2.prototype;
    proto_2.x = function () { };
    return Base2;
}());
