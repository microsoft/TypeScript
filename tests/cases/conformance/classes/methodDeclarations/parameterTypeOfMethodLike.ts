// @strict: true

class Base {
    method(x: number) { }
}

class Derived extends Base {
    method(x): void {
        x.toFixed(0);
    }
}