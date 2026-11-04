//// [tests/cases/compiler/literalUnionAfterExcludedComparisons.ts] ////

//// [literalUnionAfterExcludedComparisons.ts]
type Runtime = "node" | "deno" | "bun";
function readRuntime(value: string): Runtime {
    if (value !== "node" && value !== "deno" && value !== "bun") {
        throw new Error();
    }
    return value;
}


//// [literalUnionAfterExcludedComparisons.js]
"use strict";
function readRuntime(value) {
    if (value !== "node" && value !== "deno" && value !== "bun") {
        throw new Error();
    }
    return value;
}
