//// [specializedSignatureIsSubtypeOfNonSpecializedSignature.ts]
// Specialized signatures must be a subtype of a non-specialized signature
// All the below should not be errors

function foo(x: 'a');
function foo(x: string);
function foo(x: any) { }

class C {
    foo(x: 'a');
    foo(x: string);
    foo(x: any) { }
}

class C2<T> {
    foo(x: 'a');
    foo(x: string);
    foo(x: T);
    foo(x: any) { }
}

class C3<T extends String> {
    foo(x: 'a');
    foo(x: string);
    foo(x: T);
    foo(x: any) { }
}

interface I {
    (x: 'a');
    (x: number);
    (x: string);
    foo(x: 'a');
    foo(x: string);
    foo(x: number);
}

interface I2<T> {
    (x: 'a');
    (x: T);
    (x: string);
    foo(x: 'a');
    foo(x: string);
    foo(x: T);
}

interface I3<T extends String> {
    (x: 'a');
    (x: string);
    (x: T);
    foo(x: 'a');
    foo(x: string);
    foo(x: T);
}

var a: {
    (x: string);
    (x: 'a');
    (x: number);
    foo(x: string);
    foo(x: 'a');
    foo(x: number);
}

var a2: {
    (x: 'a');
    (x: string);
    <T>(x: T);
    foo(x: string);
    foo(x: 'a');
    foo<T>(x: T);
}

var a3: {
    (x: 'a');
    <T>(x: T);
    (x: string);
    foo(x: string);
    foo(x: 'a');
    foo<T extends String>(x: T);
}


//// [specializedSignatureIsSubtypeOfNonSpecializedSignature.js]
// Specialized signatures must be a subtype of a non-specialized signature
// All the below should not be errors
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
function foo(x) { }
var C = (function () {
    function C() {
    }
    C.prototype.foo = function (x) { };
    __names(C.prototype, ["foo"]);
    return C;
}());
var C2 = (function () {
    function C2() {
    }
    C2.prototype.foo = function (x) { };
    __names(C2.prototype, ["foo"]);
    return C2;
}());
var C3 = (function () {
    function C3() {
    }
    C3.prototype.foo = function (x) { };
    __names(C3.prototype, ["foo"]);
    return C3;
}());
var a;
var a2;
var a3;
