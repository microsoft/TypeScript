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
var Base = /** @class */ (function () {
    function Base() {
    }
    Base.prototype.x = function () { };
    return Base;
}());
var Base2 = /** @class */ (function () {
    function Base2() {
    }
    Base2.prototype.x = function () { };
    return Base2;
}());
