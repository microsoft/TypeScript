//// [computedPropertyNames40_ES6.ts]
class Foo { x }
class Foo2 { x; y }

class C {
    [s: string]: () => Foo2;

    // Computed properties
    [""]() { return new Foo }
    [""]() { return new Foo2 }
}

//// [computedPropertyNames40_ES6.js]
class Foo {
}
class Foo2 {
}
class C {
    // Computed properties
    [""]() { return new Foo; }
    [""]() { return new Foo2; }
}
