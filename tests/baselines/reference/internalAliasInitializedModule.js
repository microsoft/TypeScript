//// [tests/cases/compiler/internalAliasInitializedModule.ts] ////

//// [internalAliasInitializedModule.ts]
module a {
    export module b {
        export class c {
        }
    }
}

module c {
    import b = a.b;
    export var x: b.c = new b.c();
}

//// [internalAliasInitializedModule.js]
var a;
(function (a) {
    var b;
    (function (b) {
        var c = /** @class */ (function () {
            function c() {
            }
            return c;
        }());
        b.c = c;
    })(b = a.b || (a.b = {}));
})(a || (a = {}));
var c;
(function (c) {
    var b = a.b;
    c.x = new b.c();
})(c || (c = {}));


//// [internalAliasInitializedModule.d.ts]
declare namespace a {
    namespace b {
        class c {
        }
    }
}
declare namespace c {
    import b = a.b;
    var x: b.c;
}
