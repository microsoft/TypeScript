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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var Base = (function () {
    function Base() {
    }
    Base.prototype.x = function () { };
    __names(Base.prototype, ["x"]);
    return Base;
}());
var Base2 = (function () {
    function Base2() {
    }
    Base2.prototype.x = function () { };
    __names(Base2.prototype, ["x"]);
    return Base2;
}());
