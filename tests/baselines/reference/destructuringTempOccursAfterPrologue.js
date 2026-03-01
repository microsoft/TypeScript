//// [tests/cases/compiler/destructuringTempOccursAfterPrologue.ts] ////

//// [destructuringTempOccursAfterPrologue.ts]
function test(p: any) {
    'use strict';
    'use strong';
    p = { prop: p } = p;
}

//// [destructuringTempOccursAfterPrologue.js]
"use strict";
function test(p) {
    'use strict';
    'use strong';
    p = { prop: p } = p;
}
