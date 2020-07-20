// @declaration: true
// @pedanticOverride: true
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
