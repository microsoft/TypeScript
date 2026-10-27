//// [tests/cases/compiler/redundantNumericLiteralComparison.ts] ////

//// [redundantNumericLiteralComparison.ts]
function shouldRetry(retryCount: number, currentCount: number) {
    return retryCount === -1 || (retryCount !== -1 && currentCount <= retryCount);
}


//// [redundantNumericLiteralComparison.js]
"use strict";
function shouldRetry(retryCount, currentCount) {
    return retryCount === -1 || (retryCount !== -1 && currentCount <= retryCount);
}
