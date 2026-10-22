//// [tests/cases/compiler/nonStrictOptionalNeverResult.ts] ////

//// [nonStrictOptionalNeverResult.ts]
type Result = { error: string; details?: never } | { details: { link: string }; error?: never };
function read(result: Result) {
    if (result.error || !result.details) return;
    return result.details.link;
}


//// [nonStrictOptionalNeverResult.js]
"use strict";
function read(result) {
    if (result.error || !result.details)
        return;
    return result.details.link;
}
