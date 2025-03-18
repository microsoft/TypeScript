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
class c {
}
var m;
(function (m) {
    class c {
    }
    m.c = c;
    class g {
    }
    m.g = g;
})(m || (m = {}));
class g {
}
function foo() {
    return new c();
}
function foo2() {
    return new c();
}
function foo3() {
    return new m.c();
}
function foo4() {
    return new m.c();
}
function foo5() {
    return new g();
}
function foo6() {
    return new g();
}
function foo7() {
    return new m.g();
}
function foo8() {
    return new m.g();
}
