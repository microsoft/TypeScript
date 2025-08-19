//// [tests/cases/compiler/importAliasFromNamespace.ts] ////

//// [internal.ts]
namespace My.Internal {
    export function getThing(): void {}
    export const enum WhichThing {
        A, B, C
    }
}

//// [usage.ts]
/// <reference path="./internal.ts" preserve="true" />
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
    let Internal;
    (function (Internal) {
        function getThing() { }
        Internal.getThing = getThing;
        let WhichThing;
        (function (WhichThing) {
            WhichThing[WhichThing["A"] = 0] = "A";
            WhichThing[WhichThing["B"] = 1] = "B";
            WhichThing[WhichThing["C"] = 2] = "C";
        })(WhichThing = Internal.WhichThing || (Internal.WhichThing = {}));
    })(Internal = My.Internal || (My.Internal = {}));
})(My || (My = {}));
//// [usage.js]
/// <reference path="./internal.ts" preserve="true" />
var SomeOther;
(function (SomeOther) {
    let Thing;
    (function (Thing) {
        var Internal = My.Internal;
        class Foo {
            _which;
            constructor() {
                Internal.getThing();
                0 /* Internal.WhichThing.A */ ? "foo" : "bar";
            }
        }
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
/// <reference path="internal.d.ts" preserve="true" />
declare namespace SomeOther.Thing {
    class Foo {
        private _which;
        constructor();
    }
}
