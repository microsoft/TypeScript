//// [mergedInterfacesWithMultipleBases3.ts]
// merged interfaces behave as if all extends clauses from each declaration are merged together
// no errors expected

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

interface A<T> extends C<string>, C3<string> {
    y: T;
}

interface A<T> extends C<string>, C4<string> {
    z: T;
}

class D implements A<boolean> {
    a: string;
    b: Date;
    c: string;
    d: string;
    y: boolean;
    z: boolean;
}

//// [mergedInterfacesWithMultipleBases3.js]
// merged interfaces behave as if all extends clauses from each declaration are merged together
// no errors expected
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
