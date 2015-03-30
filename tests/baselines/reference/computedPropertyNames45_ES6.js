//// [computedPropertyNames45_ES6.ts]
class Foo { x }
class Foo2 { x; y }

class C {
    get ["get1"]() { return new Foo }
}

class D extends C {
    // No error when the indexer is in a class more derived than the computed property
    [s: string]: Foo2;
    set ["set1"](p: Foo) { }
}

//// [computedPropertyNames45_ES6.js]
class Foo {
}
class Foo2 {
}
class C {
    get ["get1"]() { return new Foo; }
}
class D extends C {
    set ["set1"](p) { }
}
