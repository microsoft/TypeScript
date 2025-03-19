//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames39_ES6.ts] ////

//// [computedPropertyNames39_ES6.ts]
class Foo { x }
class Foo2 { x; y }

class C {
    [s: number]: Foo2;

    // Computed properties
    get [1 << 6]() { return new Foo }
    set [1 << 6](p: Foo2) { }
}

//// [computedPropertyNames39_ES6.js]
class Foo {
    x;
}
class Foo2 {
    x;
    y;
}
class C {
    // Computed properties
    get [1 << 6]() { return new Foo; }
    set [1 << 6](p) { }
}
