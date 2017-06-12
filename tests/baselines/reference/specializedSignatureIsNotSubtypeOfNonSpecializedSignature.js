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
function foo(x) { }
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.foo = function (x) { };
    return C;
}());
var C2 = (function () {
    function C2() {
    }
    var proto_2 = C2.prototype;
    proto_2.foo = function (x) { };
    return C2;
}());
var C3 = (function () {
    function C3() {
    }
    var proto_3 = C3.prototype;
    proto_3.foo = function (x) { };
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
