//// [destructuringTempOccursAfterPrologue.ts]
function test(p: any) {
    'use strict';
    p = { prop: p } = p;
}

//// [destructuringTempOccursAfterPrologue.js]
function test(p) {
    'use strict';
    var _a;
    p = (_a = p, p = _a.prop, _a);
}
