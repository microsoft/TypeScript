// @noImplicitAny: true

class Base {
    method(x: number, y: string, z: boolean) { }
}

class Derived extends Base {
    method(x: number, y, z: boolean) { }
}
