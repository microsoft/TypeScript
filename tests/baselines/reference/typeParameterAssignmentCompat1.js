//// [typeParameterAssignmentCompat1.ts]
interface Foo<T> {
    frobble(value: T): T;
}

function f<T, U>(): Foo<U> {
    var x: Foo<T>;
    var y: Foo<U>;
    x = y; // should be an error
    return x;
}

class C<T> {
    f<U>(): Foo<U> {
        var x: Foo<T>;
        var y: Foo<U>;
        x = y; // should be an error
        return x;
    }
}

//// [typeParameterAssignmentCompat1.js]
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
function f() {
    var x;
    var y;
    x = y; // should be an error
    return x;
}
var C = (function () {
    function C() {
    }
    C.prototype.f = function () {
        var x;
        var y;
        x = y; // should be an error
        return x;
    };
    __names(C.prototype, ["f"]);
    return C;
}());
