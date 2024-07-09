// @declaration: true
class List<T> { }
declare module 'mod1' {
    class Foo {
    }
}

declare module 'moo' {
    import x = require('mod1');
    export var p: List<x.Foo>;
}


