//// [tests/cases/conformance/types/typeRelationships/instanceOf/narrowingGenericTypeFromInstanceof01.ts] ////

//// [narrowingGenericTypeFromInstanceof01.ts]
class A<T> {
    constructor(private a: string) { }
}

class B<T> {
}

function acceptA<T>(a: A<T>) { }
function acceptB<T>(b: B<T>) { }

function test<T>(x: A<T> | B<T>) {
    if (x instanceof B) {
        acceptA(x);
    }

    if (x instanceof A) {
        acceptA(x);
    }

    if (x instanceof B) {
        acceptB(x);
    }

    if (x instanceof B) {
        acceptB(x);
    }
}

//// [narrowingGenericTypeFromInstanceof01.js]
var A = /** @class */ (function () {
    function A(a) {
        this.a = a;
    }
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
function acceptA(a) { }
function acceptB(b) { }
function test(x) {
    if (x instanceof B) {
        acceptA(x);
    }
    if (x instanceof A) {
        acceptA(x);
    }
    if (x instanceof B) {
        acceptB(x);
    }
    if (x instanceof B) {
        acceptB(x);
    }
}
