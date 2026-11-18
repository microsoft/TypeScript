//// [tests/cases/compiler/logicalNotUndefinedComparison.ts] ////

//// [logicalNotUndefinedComparison.ts]
function isNode(object: { type?: string }) {
    return !object.type !== undefined;
}


//// [logicalNotUndefinedComparison.js]
"use strict";
function isNode(object) {
    return !object.type !== undefined;
}
