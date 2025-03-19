//// [tests/cases/compiler/declFileTypeAnnotationTypeQuery.ts] ////

//// [declFileTypeAnnotationTypeQuery.ts]
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
function foo(): typeof c {
    return c;
}
function foo2() {
    return c;
}

// Qualified name
function foo3(): typeof m.c {
    return m.c;
}
function foo4() {
    return m.c;
}

// Just the name with type arguments
function foo5(): typeof g {
    return g;
}
function foo6() {
    return g;
}

// Qualified name with type arguments
function foo7(): typeof m.g {
    return m.g
}
function foo8() {
    return m.g
}

//// [declFileTypeAnnotationTypeQuery.js]
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
// Just the name
function foo() {
    return c;
}
function foo2() {
    return c;
}
// Qualified name
function foo3() {
    return m.c;
}
function foo4() {
    return m.c;
}
// Just the name with type arguments
function foo5() {
    return g;
}
function foo6() {
    return g;
}
// Qualified name with type arguments
function foo7() {
    return m.g;
}
function foo8() {
    return m.g;
}
