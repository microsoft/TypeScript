//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames41_ES6.ts] ////

//// [computedPropertyNames41_ES6.ts]
class Foo { x }
class Foo2 { x; y }

class C {
    [s: string]: () => Foo2;

    // Computed properties
    static [""]() { return new Foo }
}

//// [computedPropertyNames41_ES6.js]
class Foo {
}
class Foo2 {
}
class C {
    // Computed properties
    static [""]() { return new Foo; }
}
