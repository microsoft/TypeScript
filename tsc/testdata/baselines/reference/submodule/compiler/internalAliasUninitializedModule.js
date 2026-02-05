//// [tests/cases/compiler/internalAliasUninitializedModule.ts] ////

//// [internalAliasUninitializedModule.ts]
namespace a {
    export namespace b {
        export interface I {
            foo();
        }
    }
}

namespace c {
    import b = a.b;
    export var x: b.I;
    x.foo();
}

//// [internalAliasUninitializedModule.js]
"use strict";
var c;
(function (c) {
    var b = a.b;
    c.x.foo();
})(c || (c = {}));


//// [internalAliasUninitializedModule.d.ts]
declare namespace a {
    namespace b {
        interface I {
            foo(): any;
        }
    }
}
declare namespace c {
    import b = a.b;
    var x: b.I;
}
