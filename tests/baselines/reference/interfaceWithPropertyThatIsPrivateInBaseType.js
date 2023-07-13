//// [tests/cases/conformance/interfaces/interfaceDeclarations/interfaceWithPropertyThatIsPrivateInBaseType.ts] ////

//// [interfaceWithPropertyThatIsPrivateInBaseType.ts]
class Base {
    private x: number;
}

interface Foo extends Base { // error
    x: number;
}

class Base2<T> {
    private x: T;
}

interface Foo2<T> extends Base2<T> { // error
    x: number;
}

//// [interfaceWithPropertyThatIsPrivateInBaseType.js]
var Base = /** @class */ (function () {
    function Base() {
    }
    return Base;
}());
var Base2 = /** @class */ (function () {
    function Base2() {
    }
    return Base2;
}());
