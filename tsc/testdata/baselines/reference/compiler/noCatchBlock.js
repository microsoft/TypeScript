//// [tests/cases/compiler/noCatchBlock.ts] ////

//// [noCatchBlock.ts]
try {
 // ...
} finally {
 // N.B. No 'catch' block
}

//// [noCatchBlock.js]
"use strict";
try {
    // ...
}
finally {
    // N.B. No 'catch' block
}
//# sourceMappingURL=noCatchBlock.js.map