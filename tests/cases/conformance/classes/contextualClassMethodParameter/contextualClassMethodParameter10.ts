// @noImplicitAny: true

class Base {
    method(x: number) { }
}

class Derived<T> extends Base {
    method(x) { }
}
