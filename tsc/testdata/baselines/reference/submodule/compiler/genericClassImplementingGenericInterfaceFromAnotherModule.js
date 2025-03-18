//// [tests/cases/compiler/genericClassImplementingGenericInterfaceFromAnotherModule.ts] ////

//// [genericClassImplementingGenericInterfaceFromAnotherModule.ts]
module foo {
    export interface IFoo<T> { }
}
module bar {
    export class Foo<T> implements foo.IFoo<T> { }
}


//// [genericClassImplementingGenericInterfaceFromAnotherModule.js]
var bar;
(function (bar) {
    class Foo {
    }
    bar.Foo = Foo;
})(bar || (bar = {}));
