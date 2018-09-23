//// [acceptableAlias1.ts]
module M {
    export module N {
    }
    export import X = N;
}

import r = M.X;

//// [acceptableAlias1.js]
var M = M || (M = {});
(function (M) {
})(M);
