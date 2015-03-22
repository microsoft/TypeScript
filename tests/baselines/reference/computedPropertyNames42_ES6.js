//// [computedPropertyNames42_ES6.ts]
class Foo { x }
class Foo2 { x; y }

class C {
    [s: string]: Foo2;

    // Computed properties
    [""]: Foo;
}

//// [computedPropertyNames42_ES6.js]
class Foo {
}
class Foo2 {
}
class C {
}
