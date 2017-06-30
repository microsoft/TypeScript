//// [tests/cases/compiler/doubleUnderscoreSymbolsAndEmit.ts] ////

//// [index.tsx]
declare global {
    namespace JSX {
        interface IntrinsicElements {
            __foot: any;
        }
    }
    function __make (params: object): any;
}

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

const thing = <__foot></__foot>;

export * from "./b";
export * from "./c";

function doThing() {
    __call: while (true) {
        aLabel: for (let i = 0; i < 10; i++) {
            if (i === 3) {
                break __call;
            }
            if (i === 5) {
                break aLabel;
            }
        }
    }
}
doThing();

//// [b.ts]
export function __foo(): number | void {}

//// [c.ts]
export function __foo(): string | void {}


//// [b.js]
"use strict";
exports.__esModule = true;
function __foo() { }
exports.__foo = __foo;
//// [c.js]
"use strict";
exports.__esModule = true;
function __foo() { }
exports.__foo = __foo;
//// [index.js]
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
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
var thing = __make("__foot", null);
__export(require("./b"));
__export(require("./c"));
function doThing() {
    __call: while (true) {
        aLabel: for (var i = 0; i < 10; i++) {
            if (i === 3) {
                break __call;
            }
            if (i === 5) {
                break aLabel;
            }
        }
    }
}
doThing();
