// @declaration: true
// @noImplicitOverride: true

abstract class Base {
    abstract foo(): unknown;
    abstract bar(): void;
}

// No errors:
abstract class Sub extends Base {
    override abstract foo(): number;
    bar() { }
}