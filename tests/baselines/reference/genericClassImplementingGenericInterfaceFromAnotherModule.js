//// [tests/cases/compiler/genericClassImplementingGenericInterfaceFromAnotherModule.ts] ////

//// [genericClassImplementingGenericInterfaceFromAnotherModule.ts]
namespace foo {
    export interface IFoo<T> { }
}
namespace bar {
    export class Foo<T> implements foo.IFoo<T> { }
}


//// [genericClassImplementingGenericInterfaceFromAnotherModule.js]
var bar;
(function (bar) {
    var Foo = /** @class */ (function () {
        function Foo() {
        }
        return Foo;
    }());
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
