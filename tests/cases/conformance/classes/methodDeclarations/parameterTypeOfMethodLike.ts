// @strict: true

class Base {
    method(x: number) { }
}

class Derived extends Base {
    method(x) {
        x.toFixed(0);
    }
}