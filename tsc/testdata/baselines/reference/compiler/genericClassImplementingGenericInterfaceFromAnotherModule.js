//// [tests/cases/compiler/genericClassImplementingGenericInterfaceFromAnotherModule.ts] ////

//// [genericClassImplementingGenericInterfaceFromAnotherModule.ts]
namespace foo {
    export interface IFoo<T> { }
}
namespace bar {
    export class Foo<T> implements foo.IFoo<T> { }
}


//// [genericClassImplementingGenericInterfaceFromAnotherModule.js]
"use strict";
var bar;
(function (bar) {
    class Foo {
    }
    bar.Foo = Foo;
})(bar || (bar = {}));


//// [genericClassImplementingGenericInterfaceFromAnotherModule.d.ts]
declare namespace foo {
    interface IFoo<T> {
    }
}
declare namespace bar {
    class Foo<T> implements foo.IFoo<T> {
    }
}
