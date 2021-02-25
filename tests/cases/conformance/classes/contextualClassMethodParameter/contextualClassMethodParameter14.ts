// @noImplicitAny: true

declare const Base: {
    method(x: string): void
}

class Derived extends Base {
    method(x) { }
}