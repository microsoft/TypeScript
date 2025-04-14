//// [tests/cases/conformance/interfaces/declarationMerging/mergedInterfacesWithMultipleBases4.ts] ////

//// [mergedInterfacesWithMultipleBases4.ts]
// merged interfaces behave as if all extends clauses from each declaration are merged together

class C<T> {
    a: T;
}

class C2<T> {
    b: T;
}

class C3<T> {
    c: T;
}

class C4<T> {
    d: T;
}

interface A<T> extends C<string>, C3<string> { // error
    y: T;
}

interface A<T> extends C<number>, C4<string> {
    z: T;
}

class D implements A<boolean> {
    a: string;
    b: string;
    c: string;
    d: string;
    y: boolean;
    z: boolean;
}

//// [mergedInterfacesWithMultipleBases4.js]
// merged interfaces behave as if all extends clauses from each declaration are merged together
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    return C2;
}());
var C3 = /** @class */ (function () {
    function C3() {
    }
    return C3;
}());
var C4 = /** @class */ (function () {
    function C4() {
    }
    return C4;
}());
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
