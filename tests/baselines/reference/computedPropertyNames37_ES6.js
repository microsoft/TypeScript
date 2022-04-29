//// [computedPropertyNames37_ES6.ts]
class Foo { x }
class Foo2 { x; y }

class C {
    [s: number]: Foo2;

    // Computed properties
    get ["get1"]() { return new Foo }
    set ["set1"](p: Foo2) { }
}

//// [computedPropertyNames37_ES6.js]
class Foo {
}
class Foo2 {
}
class C {
    // Computed properties
    get ["get1"]() { return new Foo; }
    set ["set1"](p) { }
}
