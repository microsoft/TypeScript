//// [tests/cases/compiler/doubleUnderscoreEnumEmit.ts] ////

//// [doubleUnderscoreEnumEmit.ts]
enum Foo {
    "__a" = 1,
    "(Anonymous function)" = 2,
    "(Anonymous class)" = 4,
    "__call" = 10
}
namespace Foo {
    export function ___call(): number {
        return 5;
    }
}
function Bar() {
    return "no";
}
namespace Bar {
    export function __call(x: number): number {
        return 5;
    }
}

//// [doubleUnderscoreEnumEmit.js]
var Foo;
(function (Foo) {
    Foo[Foo["__a"] = 1] = "__a";
    Foo[Foo["(Anonymous function)"] = 2] = "(Anonymous function)";
    Foo[Foo["(Anonymous class)"] = 4] = "(Anonymous class)";
    Foo[Foo["__call"] = 10] = "__call";
})(Foo || (Foo = {}));
(function (Foo) {
    function ___call() {
        return 5;
    }
    Foo.___call = ___call;
})(Foo || (Foo = {}));
function Bar() {
    return "no";
}
(function (Bar) {
    function __call(x) {
        return 5;
    }
    Bar.__call = __call;
})(Bar || (Bar = {}));
