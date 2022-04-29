//// [mergedInterfacesWithMultipleBases2.ts]
// merged interfaces behave as if all extends clauses from each declaration are merged together
// no errors expected

class C {
    a: number;
}

class C2 {
    b: number;
}

class C3 {
    c: string;
}

class C4 {
    d: string;
}


interface A extends C, C3 {
    y: string;
}

interface A extends C2, C4 {
    z: string;
}

class D implements A {
    a: number;
    b: number;
    c: string;
    d: string;
    y: string;
    z: string;
}

var a: A;
var r = a.a;

// generic interfaces in a module
module M {
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

    interface A<T> extends C<T>, C3<T> {
        y: T;
    }

    interface A<T> extends C2<string>, C4<string> {
        z: T;
    }

    class D implements A<boolean> {
        a: boolean;
        b: string;
        c: boolean;
        d: string;
        y: boolean;
        z: boolean;
    }
}

//// [mergedInterfacesWithMultipleBases2.js]
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
var a;
var r = a.a;
// generic interfaces in a module
var M;
(function (M) {
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
})(M || (M = {}));
