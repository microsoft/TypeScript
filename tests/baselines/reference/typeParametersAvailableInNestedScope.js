//// [typeParametersAvailableInNestedScope.ts]
class C<T> {
    data: T;

    x = <U>(a: U) => {
        var y: T;
        return y;
    }

    foo() {
        function temp<U>(a: U) {
            var y: T;
            return y;
        }
        return temp(<T>null);
    }
}

var c = new C<number>();
c.data = c.x(null);
c.data = c.foo();


//// [typeParametersAvailableInNestedScope.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
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
var C = (function () {
    function C() {
        this.x = function (a) {
            var y;
            return y;
        };
    }
    C.prototype.foo = function () {
        function temp(a) {
            var y;
            return y;
        }
        return temp(null);
    };
    __names(C.prototype, ["foo"]);
    return C;
}());
var c = new C();
c.data = c.x(null);
c.data = c.foo();
