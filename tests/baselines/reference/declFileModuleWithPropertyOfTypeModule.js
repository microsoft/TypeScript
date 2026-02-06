//// [tests/cases/compiler/declFileModuleWithPropertyOfTypeModule.ts] ////

//// [declFileModuleWithPropertyOfTypeModule.ts]
namespace m {
    export class c {
    }

    export var a = m;
}

//// [declFileModuleWithPropertyOfTypeModule.js]
"use strict";
var m;
(function (m) {
    class c {
    }
    m.c = c;
    m.a = m;
})(m || (m = {}));


//// [declFileModuleWithPropertyOfTypeModule.d.ts]
declare namespace m {
    class c {
    }
    var a: typeof m;
}
