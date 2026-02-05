//// [tests/cases/compiler/aliasInaccessibleModule.ts] ////

//// [aliasInaccessibleModule.ts]
namespace M {
    namespace N {
    }
    export import X = N;
}

//// [aliasInaccessibleModule.js]
"use strict";
var M;
(function (M) {
    M.X = N;
})(M || (M = {}));


//// [aliasInaccessibleModule.d.ts]
declare namespace M {
    namespace N {
    }
    export import X = N;
    export {};
}
