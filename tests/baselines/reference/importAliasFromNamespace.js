//// [tests/cases/compiler/importAliasFromNamespace.ts] ////

//// [internal.ts]
namespace My.Internal {
    export function getThing(): void {}
    export const enum WhichThing {
        A, B, C
    }
}

//// [usage.ts]
/// <reference path="./internal.ts" />
namespace SomeOther.Thing {
    import Internal = My.Internal;
    export class Foo {
        private _which: Internal.WhichThing;
        constructor() {
            Internal.getThing();
            Internal.WhichThing.A ? "foo" : "bar";
        }
    }
}

//// [internal.js]
var My;
(function (My) {
    var Internal;
    (function (Internal) {
        function getThing() { }
        Internal.getThing = getThing;
    })(Internal = My.Internal || (My.Internal = {}));
})(My || (My = {}));
//// [usage.js]
/// <reference path="./internal.ts" />
var SomeOther;
(function (SomeOther) {
    var Thing;
    (function (Thing) {
        var Internal = My.Internal;
        var Foo = /** @class */ (function () {
            function Foo() {
                Internal.getThing();
                0 /* A */ ? "foo" : "bar";
            }
            return Foo;
        }());
        Thing.Foo = Foo;
    })(Thing = SomeOther.Thing || (SomeOther.Thing = {}));
})(SomeOther || (SomeOther = {}));


//// [internal.d.ts]
declare namespace My.Internal {
    function getThing(): void;
    const enum WhichThing {
        A = 0,
        B = 1,
        C = 2
    }
}
//// [usage.d.ts]
/// <reference path="internal.d.ts" />
declare namespace SomeOther.Thing {
    class Foo {
        private _which;
        constructor();
    }
}
