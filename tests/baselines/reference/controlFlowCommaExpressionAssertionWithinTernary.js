//// [controlFlowCommaExpressionAssertionWithinTernary.ts]
declare function assert(value: any): asserts value;

function foo2(param: number | null | undefined): number | null {
    const val = param !== undefined;
    return val ? (assert(param !== undefined), param) : null;
    // ^^^^^ Still typed as number | null | undefined
}

//// [controlFlowCommaExpressionAssertionWithinTernary.js]
"use strict";
function foo2(param) {
    var val = param !== undefined;
    return val ? (assert(param !== undefined), param) : null;
    // ^^^^^ Still typed as number | null | undefined
}
