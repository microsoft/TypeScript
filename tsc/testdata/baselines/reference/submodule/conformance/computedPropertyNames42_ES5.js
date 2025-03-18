//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames42_ES5.ts] ////

//// [computedPropertyNames42_ES5.ts]
class Foo { x }
class Foo2 { x; y }

class C {
    [s: string]: Foo2;

    // Computed properties
    [""]: Foo;
}

//// [computedPropertyNames42_ES5.js]
class Foo {
    x;
}
class Foo2 {
    x;
    y;
}
class C {
    [""];
}
