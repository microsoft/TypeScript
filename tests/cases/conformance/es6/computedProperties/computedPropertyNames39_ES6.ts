// @target: es6
class Foo { x }
class Foo2 { x; y }

class C {
    [s: number]: Foo2;

    // Computed properties
    get [1 << 6]() { return new Foo }
    set [1 << 6](p: Foo2) { }
}