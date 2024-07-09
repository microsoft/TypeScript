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
function foo(): c[] {
    return [new c()];
}
function foo2() {
    return [new c()];
}

// Qualified name
function foo3(): m.c[] {
    return [new m.c()];
}
function foo4() {
    return m.c;
}

// Just the name with type arguments
function foo5(): g<string>[] {
    return [new g<string>()];
}
function foo6() {
    return [new g<string>()];
}

// Qualified name with type arguments
function foo7(): m.g<number>[] {
    return [new m.g<number>()];
}
function foo8() {
    return [new m.g<number>()];
}

// Array of function types
function foo9(): (()=>c)[] {
    return [() => new c()];
}
function foo10() {
    return [() => new c()];
}