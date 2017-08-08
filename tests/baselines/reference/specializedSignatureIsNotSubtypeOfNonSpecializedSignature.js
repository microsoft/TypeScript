//// [specializedSignatureIsNotSubtypeOfNonSpecializedSignature.ts]
function foo(x: 'a');
function foo(x: number) { }

class C {
    foo(x: 'a');
    foo(x: number);
    foo(x: any) { }
}

class C2<T> {
    foo(x: 'a');
    foo(x: T);
    foo(x: any) { }
}

class C3<T extends String> {
    foo(x: 'a');
    foo(x: T);
    foo(x: any) { }
}

interface I {
    (x: 'a');
    (x: number);
    foo(x: 'a');
    foo(x: number);
}

interface I2<T> {
    (x: 'a');
    (x: T);
    foo(x: 'a');
    foo(x: T);
}

interface I3<T extends String> {
    (x: 'a');
    (x: T);
    foo(x: 'a');
    foo(x: T);
}

var a: {
    (x: 'a');
    (x: number);
    foo(x: 'a');
    foo(x: number);
}

var a2: {
    (x: 'a');
    <T>(x: T);
    foo(x: 'a');
    foo<T>(x: T);
}

var a3: {
    (x: 'a');
    <T>(x: T);
    foo(x: 'a');
    foo<T extends String>(x: T);
}


//// [specializedSignatureIsNotSubtypeOfNonSpecializedSignature.js]
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


//// [specializedSignatureIsNotSubtypeOfNonSpecializedSignature.d.ts]
declare function foo(x: 'a'): any;
declare class C {
    foo(x: 'a'): any;
    foo(x: number): any;
}
declare class C2<T> {
    foo(x: 'a'): any;
    foo(x: T): any;
}
declare class C3<T extends String> {
    foo(x: 'a'): any;
    foo(x: T): any;
}
interface I {
    (x: 'a'): any;
    (x: number): any;
    foo(x: 'a'): any;
    foo(x: number): any;
}
interface I2<T> {
    (x: 'a'): any;
    (x: T): any;
    foo(x: 'a'): any;
    foo(x: T): any;
}
interface I3<T extends String> {
    (x: 'a'): any;
    (x: T): any;
    foo(x: 'a'): any;
    foo(x: T): any;
}
declare var a: {
    (x: 'a');
    (x: number);
    foo(x: 'a');
    foo(x: number);
};
declare var a2: {
    (x: 'a');
    <T>(x: T);
    foo(x: 'a');
    foo<T>(x: T);
};
declare var a3: {
    (x: 'a');
    <T>(x: T);
    foo(x: 'a');
    foo<T extends String>(x: T);
};
