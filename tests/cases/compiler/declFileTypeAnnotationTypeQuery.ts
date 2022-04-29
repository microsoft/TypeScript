// @target: ES5
// @declaration: true

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