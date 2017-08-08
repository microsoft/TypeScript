//// [implementInterfaceAnyMemberWithVoid.ts]
interface I {
    foo(value: number);
}

class Bug implements I {
    public foo(value: number) {
    }
}


//// [implementInterfaceAnyMemberWithVoid.js]
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
var Bug = (function () {
    function Bug() {
    }
    Bug.prototype.foo = function (value) {
    };
    __names(Bug.prototype, ["foo"]);
    return Bug;
}());
