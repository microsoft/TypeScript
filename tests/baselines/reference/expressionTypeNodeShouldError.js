//// [tests/cases/compiler/expressionTypeNodeShouldError.ts] ////

//// [base.d.ts]
declare const x: "foo".charCodeAt(0);

//// [string.ts]
interface String {
    typeof<T>(x: T): T;
}

class C {
    foo() {
        const x: "".typeof(this.foo);
    }
}

const nodes = document.getElementsByTagName("li");
type ItemType = "".typeof(nodes.item(0));

//// [number.ts]
interface Number {
    typeof<T>(x: T): T;
}

class C2 {
    foo() {
        const x: 3.141592.typeof(this.foo);
    }
}

const nodes2 = document.getElementsByTagName("li");
type ItemType2 = 4..typeof(nodes.item(0));

//// [boolean.ts]
interface Boolean {
    typeof<T>(x: T): T;
}

class C3 {
    foo() {
        const x: false.typeof(this.foo);
    }
}

const nodes3 = document.getElementsByTagName("li");
type ItemType3 = true.typeof(nodes.item(0));



//// [string.js]
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
    function C() {
    }
    C.prototype.foo = function () {
        var x;
        typeof (this.foo);
    };
    __names(C.prototype, ["foo"]);
    return C;
}());
var nodes = document.getElementsByTagName("li");
typeof (nodes.item(0));
//// [number.js]
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
var C2 = (function () {
    function C2() {
    }
    C2.prototype.foo = function () {
        var x;
        typeof (this.foo);
    };
    __names(C2.prototype, ["foo"]);
    return C2;
}());
var nodes2 = document.getElementsByTagName("li");
typeof (nodes.item(0));
//// [boolean.js]
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
var C3 = (function () {
    function C3() {
    }
    C3.prototype.foo = function () {
        var x;
        typeof (this.foo);
    };
    __names(C3.prototype, ["foo"]);
    return C3;
}());
var nodes3 = document.getElementsByTagName("li");
typeof (nodes.item(0));
