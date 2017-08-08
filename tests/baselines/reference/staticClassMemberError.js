//// [staticClassMemberError.ts]
class C {
	static s;
	public a() {
		s = 1;
	}
}

// just want to make sure this one doesn't crash the compiler
function Foo();
class Foo {
 static bar;
}

//// [staticClassMemberError.js]
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
    }
    C.prototype.a = function () {
        s = 1;
    };
    __names(C.prototype, ["a"]);
    return C;
}());
var Foo = (function () {
    function Foo() {
    }
    return Foo;
}());
