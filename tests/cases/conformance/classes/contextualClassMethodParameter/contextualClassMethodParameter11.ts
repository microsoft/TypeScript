// @noImplicitAny: true

class Base<T> {
    method(x: T) { }
}

class Derived extends Base<string> {
    method(x) { }
}
