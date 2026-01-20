//// [tests/cases/compiler/functionMergedWithModule.ts] ////

//// [functionMergedWithModule.ts]
function foo(title: string) {
    var x = 10;
}

namespace foo.Bar {
    export function f() {
    }
}

namespace foo.Baz {
    export function g() {
        Bar.f();
    }
}

//// [functionMergedWithModule.js]
function foo(title) {
    var x = 10;
}
(function (foo) {
    var Bar;
    (function (Bar) {
        function f() {
        }
        Bar.f = f;
    })(Bar = foo.Bar || (foo.Bar = {}));
})(foo || (foo = {}));
(function (foo) {
    var Baz;
    (function (Baz) {
        function g() {
            foo.Bar.f();
        }
        Baz.g = g;
    })(Baz = foo.Baz || (foo.Baz = {}));
})(foo || (foo = {}));
