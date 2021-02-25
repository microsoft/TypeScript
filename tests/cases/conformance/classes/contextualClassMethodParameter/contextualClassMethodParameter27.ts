// @noImplicitAny: true

class Base {
    method(x: number) { }
}

class Derived extends Base {
    method(x: 42 | 12) { }
}

class DD extends Derived {
    method (x) { }
}
