// @target: es5
class Foo { x }
class Foo2 { x; y }

class C {
    [s: string]: () => Foo2;

    // Computed properties
    static [""]() { return new Foo }
}