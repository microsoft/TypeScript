//// [tests/cases/compiler/labelReferenceDiagnostics.ts] ////

//// [labelReferenceDiagnostics.ts]
function breakToLaterLabel() {
    break target;
    target:
    while (true) {}
}

function continueToLaterLabel() {
    continue target;
    target:
    while (true) {}
}

function breakToMissingLabel() {
    break target;
}

function breakToFunctionNameLabel() {
    break breakToFunctionNameLabel;
}

function continueToMissingLabel() {
    while (true) {
        continue target;
    }
}

function breakToNonEnclosingLabel() {
    target:
    console.log("target");
    break target;
}

function continueToNonEnclosingLabel() {
    target:
    while (true) {}
    while (true) {
        continue target;
    }
}

target:
while (true) {
    function crossesFunctionBoundary() {
        break target;
    }
}


//// [labelReferenceDiagnostics.js]
"use strict";
function breakToLaterLabel() {
    break target;
    target: while (true) { }
}
function continueToLaterLabel() {
    continue target;
    target: while (true) { }
}
function breakToMissingLabel() {
    break target;
}
function breakToFunctionNameLabel() {
    break breakToFunctionNameLabel;
}
function continueToMissingLabel() {
    while (true) {
        continue target;
    }
}
function breakToNonEnclosingLabel() {
    target: console.log("target");
    break target;
}
function continueToNonEnclosingLabel() {
    target: while (true) { }
    while (true) {
        continue target;
    }
}
target: while (true) {
    function crossesFunctionBoundary() {
        break target;
    }
}
