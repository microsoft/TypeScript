// @declaration: true
// @lib: dom,es6
var Foo = class Foo {
    method<T extends keyof ElementTagNameMap>() {};
}

class Bar {
    method<T extends keyof ElementTagNameMap>() {};
}