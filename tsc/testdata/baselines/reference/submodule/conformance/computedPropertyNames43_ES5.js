//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames43_ES5.ts] ////

//// [computedPropertyNames43_ES5.ts]
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

//// [computedPropertyNames43_ES5.js]
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
    get ["get1"]() { return new Foo; }
    set ["set1"](p) { }
}
