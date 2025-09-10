//// [tests/cases/compiler/acceptableAlias1.ts] ////

//// [acceptableAlias1.ts]
namespace M {
    export namespace N {
    }
    export import X = N;
}

import r = M.X;

//// [acceptableAlias1.js]
var M;
(function (M) {
})(M || (M = {}));
