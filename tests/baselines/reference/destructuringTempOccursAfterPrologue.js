//// [destructuringTempOccursAfterPrologue.ts]
function test(p: any) {
    'use strict';
    'use strong';
    p = { prop: p } = p;
}

//// [destructuringTempOccursAfterPrologue.js]
function test(p) {
    'use strict';
    'use strong';
    var _a;
    p = (_a = p, p = _a.prop, _a);
}
