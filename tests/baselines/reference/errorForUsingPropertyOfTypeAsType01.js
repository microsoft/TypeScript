//// [errorForUsingPropertyOfTypeAsType01.ts]
namespace Test1 {
    export interface Foo {
        bar: string;
    }

    var x: Foo.bar = "";
}

namespace Test2 {
    export class Foo {
        bar: string;
    }

    var x: Foo.bar = "";
}

namespace Test3 {
    export type Foo = {
        bar: string;
    }

    var x: Foo.bar = "";
}

namespace Test4 {
    export type Foo = { bar: number }
                    | { bar: string }

    var x: Foo.bar = "";
}

namespace Test5 {
    export type Foo = { bar: number }
                    | { wat: string }

    var x: Foo.bar = "";
}

//// [errorForUsingPropertyOfTypeAsType01.js]
var Test1;
(function (Test1) {
    var x = "";
})(Test1 || (Test1 = {}));
var Test2;
(function (Test2) {
    var Foo = (function () {
        function Foo() {
        }
        return Foo;
    }());
    Test2.Foo = Foo;
    var x = "";
})(Test2 || (Test2 = {}));
var Test3;
(function (Test3) {
    var x = "";
})(Test3 || (Test3 = {}));
var Test4;
(function (Test4) {
    var x = "";
})(Test4 || (Test4 = {}));
var Test5;
(function (Test5) {
    var x = "";
})(Test5 || (Test5 = {}));
