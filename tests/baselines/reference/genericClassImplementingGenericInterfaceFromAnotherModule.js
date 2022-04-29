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
    var Foo = /** @class */ (function () {
        function Foo() {
        }
        return Foo;
    }());
    bar.Foo = Foo;
})(bar || (bar = {}));


//// [genericClassImplementingGenericInterfaceFromAnotherModule.d.ts]
declare module foo {
    interface IFoo<T> {
    }
}
declare module bar {
    class Foo<T> implements foo.IFoo<T> {
    }
}
