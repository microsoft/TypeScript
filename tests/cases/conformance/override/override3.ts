// @declaration: true
// @noImplicitOverride: true
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
