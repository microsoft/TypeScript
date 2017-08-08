//// [genericWithOpenTypeParameters1.ts]
class B<T> {
   foo(x: T): T { return null; }
}

var x: B<number>;
x.foo(1); // no error
var f = <T>(x: B<T>) => { return x.foo(1); } // error
var f2 = <T>(x: B<T>) => { return x.foo<T>(1); } // error
var f3 = <T>(x: B<T>) => { return x.foo<number>(1); } // error
var f4 = (x: B<number>) => { return x.foo(1); } // no error


//// [genericWithOpenTypeParameters1.js]
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
var B = (function () {
    function B() {
    }
    B.prototype.foo = function (x) { return null; };
    __names(B.prototype, ["foo"]);
    return B;
}());
var x;
x.foo(1); // no error
var f = function (x) { return x.foo(1); }; // error
var f2 = function (x) { return x.foo(1); }; // error
var f3 = function (x) { return x.foo(1); }; // error
var f4 = function (x) { return x.foo(1); }; // no error
