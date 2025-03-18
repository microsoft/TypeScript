//// [tests/cases/conformance/override/override3.ts] ////

//// [override3.ts]
declare class B {
    foo(): void
    bar(): void
}

declare class D extends B {
    foo (): void;
    override bar (): void;
}

class DB extends B {
    override foo(): void {}
    override bar(): void {}
}

class DD extends D {
    override foo(): void {}
    override bar(): void {}
}

class EB extends D {
    foo(): void {}
    override bar(): void {}
}


//// [override3.js]
class DB extends B {
    foo() { }
    bar() { }
}
class DD extends D {
    foo() { }
    bar() { }
}
class EB extends D {
    foo() { }
    bar() { }
}
