//// [tests/cases/compiler/internalAliasClass.ts] ////

//// [internalAliasClass.ts]
namespace a {
    export class c {
    }
}

namespace c {
    import b = a.c;
    export var x: b = new b();
}

//// [internalAliasClass.js]
"use strict";
var a;
(function (a) {
    class c {
    }
    a.c = c;
})(a || (a = {}));
var c;
(function (c) {
    var b = a.c;
    c.x = new b();
})(c || (c = {}));


//// [internalAliasClass.d.ts]
declare namespace a {
    class c {
    }
}
declare namespace c {
    import b = a.c;
    var x: b;
}
