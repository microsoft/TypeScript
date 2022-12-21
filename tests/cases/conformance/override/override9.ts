// @declaration: true
// @noImplicitOverride: true
interface B {
    foo (): void
    bar (): void
}

interface D extends B {
    foo (): void;
    override bar(): void;
    baz(): void;
    override bazz(): void;
}
