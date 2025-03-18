//// [tests/cases/conformance/override/override10.ts] ////

//// [override10.ts]
abstract class Base {
    abstract foo(): unknown;
    abstract bar(): void;
}

abstract class Sub extends Base {
    abstract override foo(): number;
    bar() { }
}

//// [override10.js]
class Base {
}
class Sub extends Base {
    bar() { }
}
