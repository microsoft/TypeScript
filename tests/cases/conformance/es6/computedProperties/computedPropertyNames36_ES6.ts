// @target: es6
class Foo { x }
class Foo2 { x; y }

class C {
    [s: string]: Foo2;

    // Computed properties
    get ["get1"]() { return new Foo }
    set ["set1"](p: Foo2) { }
}