//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames41_ES5.ts] ////

//// [computedPropertyNames41_ES5.ts]
class Foo { x }
class Foo2 { x; y }

class C {
    [s: string]: () => Foo2;

    // Computed properties
    static [""]() { return new Foo }
}

//// [computedPropertyNames41_ES5.js]
class Foo {
    x;
}
class Foo2 {
    x;
    y;
}
class C {
    static [""]() { return new Foo; }
}
