//// [tests/cases/compiler/destructuringTempOccursAfterPrologue.ts] ////

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
    'use strict';
    'use strong';
    p = { prop: p } = p;
}
