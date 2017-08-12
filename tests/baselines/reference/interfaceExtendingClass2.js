//// [interfaceExtendingClass2.ts]
class Foo {
    x: string;
    y() { }
    get Z() {
        return 1;
    }
    [x: string]: Object;
}

interface I2 extends Foo { // error
    a: {
        toString: () => {
            return 1;
        };
    }

//// [interfaceExtendingClass2.js]
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
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype.y = function () { };
    Object.defineProperty(Foo.prototype, "Z", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    __names(Foo.prototype, ["y"]);
    return Foo;
}());
return 1;
;
