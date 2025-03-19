//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames36_ES5.ts] ////

//// [computedPropertyNames36_ES5.ts]
class Foo { x }
class Foo2 { x; y }

class C {
    [s: string]: Foo2;

    // Computed properties
    get ["get1"]() { return new Foo }
    set ["set1"](p: Foo2) { }
}

//// [computedPropertyNames36_ES5.js]
class Foo {
    x;
}
class Foo2 {
    x;
    y;
}
class C {
    // Computed properties
    get ["get1"]() { return new Foo; }
    set ["set1"](p) { }
}
