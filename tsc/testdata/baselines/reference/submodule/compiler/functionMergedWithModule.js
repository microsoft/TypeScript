//// [tests/cases/compiler/functionMergedWithModule.ts] ////

//// [functionMergedWithModule.ts]
function foo(title: string) {
    var x = 10;
}

module foo.Bar {
    export function f() {
    }
}

module foo.Baz {
    export function g() {
        Bar.f();
    }
}

//// [functionMergedWithModule.js]
function foo(title) {
    var x = 10;
}
(function (foo) {
    let Bar;
    (function (Bar) {
        function f() {
        }
        Bar.f = f;
    })(Bar = foo.Bar || (foo.Bar = {}));
})(foo || (foo = {}));
(function (foo) {
    let Baz;
    (function (Baz) {
        function g() {
            Bar.f();
        }
        Baz.g = g;
    })(Baz = foo.Baz || (foo.Baz = {}));
})(foo || (foo = {}));
