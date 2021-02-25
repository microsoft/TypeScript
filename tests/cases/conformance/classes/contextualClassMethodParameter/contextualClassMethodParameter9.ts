// @noImplicitAny: true

class Base {
    method(x: number) { }
}

class Derived extends Base {
    method<T>(x) { }
}
