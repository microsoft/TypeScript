//// [tests/cases/compiler/declFileTypeAnnotationTypeReference.ts] ////

//// [declFileTypeAnnotationTypeReference.ts]
class c {
}
module m {
    export class c {
    }
    export class g<T> {
    }
}
class g<T> {
}

// Just the name
function foo(): c {
    return new c();
}
function foo2() {
    return new c();
}

// Qualified name
function foo3(): m.c {
    return new m.c();
}
function foo4() {
    return new m.c();
}

// Just the name with type arguments
function foo5(): g<string> {
    return new g<string>();
}
function foo6() {
    return new g<string>();
}

// Qualified name with type arguments
function foo7(): m.g<number> {
    return new m.g<number>();
}
function foo8() {
    return new m.g<number>();
}

//// [declFileTypeAnnotationTypeReference.js]
var c = /** @class */ (function () {
    function c() {
    }
    return c;
}());
var m;
(function (m) {
    var c = /** @class */ (function () {
        function c() {
        }
        return c;
    }());
    m.c = c;
    var g = /** @class */ (function () {
        function g() {
        }
        return g;
    }());
    m.g = g;
})(m || (m = {}));
var g = /** @class */ (function () {
    function g() {
    }
    return g;
}());
// Just the name
function foo() {
    return new c();
}
function foo2() {
    return new c();
}
// Qualified name
function foo3() {
    return new m.c();
}
function foo4() {
    return new m.c();
}
// Just the name with type arguments
function foo5() {
    return new g();
}
function foo6() {
    return new g();
}
// Qualified name with type arguments
function foo7() {
    return new m.g();
}
function foo8() {
    return new m.g();
}


//// [declFileTypeAnnotationTypeReference.d.ts]
declare class c {
}
declare namespace m {
    class c {
    }
    class g<T> {
    }
}
declare class g<T> {
}
declare function foo(): c;
declare function foo2(): c;
declare function foo3(): m.c;
declare function foo4(): m.c;
declare function foo5(): g<string>;
declare function foo6(): g<string>;
declare function foo7(): m.g<number>;
declare function foo8(): m.g<number>;
