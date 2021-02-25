// @noImplicitAny: true

class Base {
    method(x: number): void
    method(x: number | string): void { }
}

class Derived extends Base {
    method(x) { }
}
