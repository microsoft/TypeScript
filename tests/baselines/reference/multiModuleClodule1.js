//// [multiModuleClodule1.ts]
class C {
    constructor(x: number) { }
    foo() { }
    bar() { }
    static boo() { }
}

module C {
    export var x = 1;
    var y = 2;
}
module C {
    export function foo() { }
    function baz() { return ''; }
}

var c = new C(C.x);
c.foo = C.foo;

//// [multiModuleClodule1.js]
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
var C = (function () {
    function C(x) {
    }
    C.prototype.foo = function () { };
    C.prototype.bar = function () { };
    C.boo = function () { };
    __names(C.prototype, ["foo", "bar"]);
    return C;
}());
(function (C) {
    C.x = 1;
    var y = 2;
})(C || (C = {}));
(function (C) {
    function foo() { }
    C.foo = foo;
    function baz() { return ''; }
})(C || (C = {}));
var c = new C(C.x);
c.foo = C.foo;
