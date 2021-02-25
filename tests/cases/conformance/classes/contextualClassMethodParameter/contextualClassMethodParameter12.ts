// @noImplicitAny: true

class Base<T> {
    method(x: T) { }
}

class Derived<T> extends Base<T> {
    method(x) { }
}
