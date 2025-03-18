//// [tests/cases/conformance/override/override1.ts] ////

//// [override1.ts]
class B {
    foo (v: string) {}
    fooo (v: string) {}
}

class D extends B {
    override foo (v: string) {}

    fooo (v: string) {}

    override bar(v: string) {}
}

class C {
    override foo(v: string) {}
}

function f () {
    return class extends B {
        override foo (v: string) {}
    
        fooo (v: string) {}
    
        override bar(v: string) {}
    }
}

class E extends (class {
    foo () { }
    bar () { }
}) {
    override foo () { }
    bar () { }

    baz() {}

    override bazz () {}
}

function ff () {
    return class {
        override foo () {}
    }
}

//// [override1.js]
class B {
    foo(v) { }
    fooo(v) { }
}
class D extends B {
    foo(v) { }
    fooo(v) { }
    bar(v) { }
}
class C {
    foo(v) { }
}
function f() {
    return class extends B {
        foo(v) { }
        fooo(v) { }
        bar(v) { }
    };
}
class E extends (class {
    foo() { }
    bar() { }
}) {
    foo() { }
    bar() { }
    baz() { }
    bazz() { }
}
function ff() {
    return class {
        foo() { }
    };
}
