//// [errorForUsingPropertyOfTypeAsType01.ts]
namespace Test1 {
    export interface Foo {
        bar: string;
    }

    var x: Foo.bar = "";
    var y: Test1.Foo.bar = "";
}

namespace Test2 {
    export class Foo {
        bar: string;
    }

    var x: Foo.bar = "";
    var y: Test2.Foo.bar = "";
}

namespace Test3 {
    export type Foo = {
        bar: string;
    }

    var x: Foo.bar = "";
    var y: Test3.Foo.bar = "";
}

namespace Test4 {
    export type Foo = { bar: number }
                    | { bar: string }

    var x: Foo.bar = "";
    var y: Test4.Foo.bar = "";
}

namespace Test5 {
    export type Foo = { bar: number }
                    | { wat: string }

    var x: Foo.bar = "";
    var y: Test5.Foo.bar = "";
}

import lol = Test5.Foo.

//// [errorForUsingPropertyOfTypeAsType01.js]
var Test1;
(function (Test1) {
    var x = "";
    var y = "";
})(Test1 || (Test1 = {}));
var Test2;
(function (Test2) {
    var Foo = /** @class */ (function () {
        function Foo() {
        }
        return Foo;
    }());
    Test2.Foo = Foo;
    var x = "";
    var y = "";
})(Test2 || (Test2 = {}));
var Test3;
(function (Test3) {
    var x = "";
    var y = "";
})(Test3 || (Test3 = {}));
var Test4;
(function (Test4) {
    var x = "";
    var y = "";
})(Test4 || (Test4 = {}));
var Test5;
(function (Test5) {
    var x = "";
    var y = "";
})(Test5 || (Test5 = {}));
var lol = Test5.Foo.;
