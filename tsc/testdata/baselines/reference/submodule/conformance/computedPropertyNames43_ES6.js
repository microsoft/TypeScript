//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames43_ES6.ts] ////

//// [computedPropertyNames43_ES6.ts]
class Foo { x }
class Foo2 { x; y }

class C {
    [s: string]: Foo2;
}

class D extends C {
    // Computed properties
    get ["get1"]() { return new Foo }
    set ["set1"](p: Foo2) { }
}

//// [computedPropertyNames43_ES6.js]
class Foo {
    x;
}
class Foo2 {
    x;
    y;
}
class C {
}
class D extends C {
    // Computed properties
    get ["get1"]() { return new Foo; }
    set ["set1"](p) { }
}
