//// [tests/cases/compiler/declFileImportedTypeUseInTypeArgPosition.ts] ////

//// [declFileImportedTypeUseInTypeArgPosition.ts]
class List<T> { }
declare module 'mod1' {
    class Foo {
    }
}

declare module 'moo' {
    import x = require('mod1');
    export var p: List<x.Foo>;
}




//// [declFileImportedTypeUseInTypeArgPosition.js]
"use strict";
class List {
}


//// [declFileImportedTypeUseInTypeArgPosition.d.ts]
declare class List<T> {
}
declare module 'mod1' {
    class Foo {
    }
}
declare module 'moo' {
    import x = require('mod1');
    var p: List<x.Foo>;
}
