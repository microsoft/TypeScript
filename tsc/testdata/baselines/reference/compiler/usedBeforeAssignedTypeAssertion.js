//// [tests/cases/compiler/usedBeforeAssignedTypeAssertion.ts] ////

//// [usedBeforeAssignedTypeAssertion.ts]
function directAssignment() {
    let value: number;
    value = 1;
}

function parenthesizedAssignment() {
    let value: number;
    (value) = 1;
}

function asAssignment() {
    let value: number;
    (value as number) = 1;
}

function typeAssertionAssignment() {
    let value: number;
    (<number>value) = 1;
}

function nestedAssertionAssignment() {
    let value: number;
    ((<number>value) as number) = 1;
}

function readBeforeAssignment() {
    let value: number;
    return value as number;
}

function compoundAssignmentBeforeInitialization() {
    let value: number;
    (value as number) += 1;
}

function incrementBeforeInitialization() {
    let value: number;
    ++(<number>value);
}

function decrementBeforeInitialization() {
    let value: number;
    (value as number)--;
}

function initializedCompoundAssignments() {
    let value = 1;
    (value as number) += 1;
    ++(<number>value);
    (value as number)--;
}

function constAssignment() {
    const value = 1;
    (value as any) = 2;
    (<any>value) = 3;
}

function readonlyPropertyAssignment() {
    const object: { readonly value: number } = { value: 1 };
    (object.value as number) = 2;
    (<number>object["value"]) = 3;
}

function mutableObjectAssertion() {
    const object: { readonly value: number } = { value: 1 };
    (object as { value: number }).value = 2;
}


//// [usedBeforeAssignedTypeAssertion.js]
"use strict";
function directAssignment() {
    let value;
    value = 1;
}
function parenthesizedAssignment() {
    let value;
    (value) = 1;
}
function asAssignment() {
    let value;
    value = 1;
}
function typeAssertionAssignment() {
    let value;
    value = 1;
}
function nestedAssertionAssignment() {
    let value;
    value = 1;
}
function readBeforeAssignment() {
    let value;
    return value;
}
function compoundAssignmentBeforeInitialization() {
    let value;
    value += 1;
}
function incrementBeforeInitialization() {
    let value;
    ++value;
}
function decrementBeforeInitialization() {
    let value;
    value--;
}
function initializedCompoundAssignments() {
    let value = 1;
    value += 1;
    ++value;
    value--;
}
function constAssignment() {
    const value = 1;
    value = 2;
    value = 3;
}
function readonlyPropertyAssignment() {
    const object = { value: 1 };
    object.value = 2;
    object["value"] = 3;
}
function mutableObjectAssertion() {
    const object = { value: 1 };
    object.value = 2;
}
