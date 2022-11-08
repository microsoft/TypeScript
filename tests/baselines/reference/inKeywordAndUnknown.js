//// [inKeywordAndUnknown.ts]
// Repro from #50531

function f(x: {}, y: unknown) {
    if (!("a" in x)) {
        return;
    }
    x;  // {}
    if (!y) {
        return;
    }
    y;  // {}
    if (!("a" in y)) {
        return;
    }
    y;  // {}
}


//// [inKeywordAndUnknown.js]
"use strict";
// Repro from #50531
function f(x, y) {
    if (!("a" in x)) {
        return;
    }
    x; // {}
    if (!y) {
        return;
    }
    y; // {}
    if (!("a" in y)) {
        return;
    }
    y; // {}
}
