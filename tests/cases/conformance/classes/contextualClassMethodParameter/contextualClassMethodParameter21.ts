// @noImplicitAny: true

class Base {
    method<T>(x: T) { }
}

class Derived extends Base {
    method(x) { }
}
