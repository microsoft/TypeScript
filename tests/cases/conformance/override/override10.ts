// @declaration: true
// @noImplicitOverride: true

abstract class Base {
    abstract foo(): unknown;
    abstract bar(): void;
}

abstract class Sub extends Base {
    abstract override foo(): number;
    bar() { }
}