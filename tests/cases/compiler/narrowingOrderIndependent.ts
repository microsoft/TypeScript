// @strict: true

// Repro from #36709

class A {
    constructor(public stringOrUndefined: string | undefined) {}
}

class B {
    constructor(public str: string) {}
}

const a = new A("123");

if (a instanceof A && a.stringOrUndefined) {
    new B(a.stringOrUndefined)
}

if (a.stringOrUndefined && a instanceof A) {
    new B(a.stringOrUndefined)
}

if (a instanceof A) {
    if (a.stringOrUndefined) {
        new B(a.stringOrUndefined)
    }
}

if (a.stringOrUndefined) {
    if (a instanceof A) {
        new B(a.stringOrUndefined)
    }
}
