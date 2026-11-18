//// [tests/cases/compiler/compoundAssignmentAfterExcludedLiteral.ts] ////

//// [compoundAssignmentAfterExcludedLiteral.ts]
function append(buffer: { value: string }) {
    if (buffer.value !== "") {
        buffer.value += "\n";
    }
}


//// [compoundAssignmentAfterExcludedLiteral.js]
"use strict";
function append(buffer) {
    if (buffer.value !== "") {
        buffer.value += "\n";
    }
}
