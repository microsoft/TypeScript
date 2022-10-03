//// [computedPropertyNames44_ES6.ts]
class Foo { x }
class Foo2 { x; y }

class C {
    [s: string]: Foo2;
    get ["get1"]() { return new Foo }
}

class D extends C {
    set ["set1"](p: Foo) { }
}

//// [computedPropertyNames44_ES6.js]
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
