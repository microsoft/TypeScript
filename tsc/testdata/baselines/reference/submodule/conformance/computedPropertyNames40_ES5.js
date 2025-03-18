//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames40_ES5.ts] ////

//// [computedPropertyNames40_ES5.ts]
class Foo { x }
class Foo2 { x; y }

class C {
    [s: string]: () => Foo2;

    // Computed properties
    [""]() { return new Foo }
    [""]() { return new Foo2 }
}

//// [computedPropertyNames40_ES5.js]
class Foo {
    x;
}
class Foo2 {
    x;
    y;
}
class C {
    [""]() { return new Foo; }
    [""]() { return new Foo2; }
}
