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
    (function (b) {
        var c = (function () {
            function c() {
            }
            return c;
        })();
        b.c = c;
    })(a.b || (a.b = {}));
    var b = a.b;
})(a || (a = {}));
var c;
(function (c) {
    var b = a.b;
    c.x = new b.c();
})(c || (c = {}));


//// [internalAliasInitializedModule.d.ts]
declare module a {
    module b {
        class c {
        }
    }
}
declare module c {
    var x: b.c;
}


//// [DtsFileErrors]


==== tests/cases/compiler/internalAliasInitializedModule.d.ts (1 errors) ====
    declare module a {
        module b {
            class c {
            }
        }
    }
    declare module c {
        var x: b.c;
               ~~~
!!! Cannot find name 'b'.
    }
    