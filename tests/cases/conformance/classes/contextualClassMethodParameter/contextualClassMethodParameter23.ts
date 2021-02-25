// @noImplicitAny: true

class Base {
    method(x: number): x is number {
        return true
    }
}

class Derived extends Base {
    method(x) { }
}
