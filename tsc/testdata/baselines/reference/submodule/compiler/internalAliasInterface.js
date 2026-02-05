//// [tests/cases/compiler/internalAliasInterface.ts] ////

//// [internalAliasInterface.ts]
namespace a {
    export interface I {
    }
}

namespace c {
    import b = a.I;
    export var x: b;
}


//// [internalAliasInterface.js]
"use strict";
var c;
(function (c) {
    var b = a.I;
})(c || (c = {}));


//// [internalAliasInterface.d.ts]
declare namespace a {
    interface I {
    }
}
declare namespace c {
    import b = a.I;
    var x: b;
}
