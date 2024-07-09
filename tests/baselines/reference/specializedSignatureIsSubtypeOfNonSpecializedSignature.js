//// [tests/cases/conformance/types/objectTypeLiteral/callSignatures/specializedSignatureIsSubtypeOfNonSpecializedSignature.ts] ////

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
function foo(x) { }
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function (x) { };
    return C;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    C2.prototype.foo = function (x) { };
    return C2;
}());
var C3 = /** @class */ (function () {
    function C3() {
    }
    C3.prototype.foo = function (x) { };
    return C3;
}());
var a;
var a2;
var a3;
