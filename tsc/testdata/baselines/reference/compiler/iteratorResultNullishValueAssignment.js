//// [tests/cases/compiler/iteratorResultNullishValueAssignment.ts] ////

//// [iteratorResultNullishValueAssignment.ts]
function initialize(result: IteratorResult<object, void>) {
    if (result.value == null) {
        result.value = {};
    }
}


//// [iteratorResultNullishValueAssignment.js]
"use strict";
function initialize(result) {
    if (result.value == null) {
        result.value = {};
    }
}
