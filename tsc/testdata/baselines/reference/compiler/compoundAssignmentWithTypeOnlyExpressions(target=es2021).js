//// [tests/cases/compiler/compoundAssignmentWithTypeOnlyExpressions.ts] ////

//// [compoundAssignmentWithTypeOnlyExpressions.ts]
declare function getObject(): { x: number; [key: number]: number };
let key = 0;

function logicalOrAssignment() {
    getObject()[++key]! ||= 1;
    (getObject()[++key] as number) ||= 1;
    (getObject()[++key] satisfies number) ||= 1;
    (<number>getObject()[++key]) ||= 1;
    ((getObject()[++key]) as number)! ||= 1;
    (getObject()[++key]) ||= 1;

    getObject().x! ||= 1;
    (getObject().x as number) ||= 1;
    (getObject().x satisfies number) ||= 1;
    (<number>getObject().x) ||= 1;
    ((getObject().x) as number)! ||= 1;
    (getObject().x) ||= 1;
}

function logicalAndAssignment() {
    getObject()[++key]! &&= 1;
    (getObject()[++key] as number) &&= 1;
    (getObject()[++key] satisfies number) &&= 1;
    (<number>getObject()[++key]) &&= 1;
    ((getObject()[++key]) as number)! &&= 1;
    (getObject()[++key]) &&= 1;

    getObject().x! &&= 1;
    (getObject().x as number) &&= 1;
    (getObject().x satisfies number) &&= 1;
    (<number>getObject().x) &&= 1;
    ((getObject().x) as number)! &&= 1;
    (getObject().x) &&= 1;
}

function nullishAssignment() {
    getObject()[++key]! ??= 1;
    (getObject()[++key] as number) ??= 1;
    (getObject()[++key] satisfies number) ??= 1;
    (<number>getObject()[++key]) ??= 1;
    ((getObject()[++key]) as number)! ??= 1;
    (getObject()[++key]) ??= 1;

    getObject().x! ??= 1;
    (getObject().x as number) ??= 1;
    (getObject().x satisfies number) ??= 1;
    (<number>getObject().x) ??= 1;
    ((getObject().x) as number)! ??= 1;
    (getObject().x) ??= 1;
}

function exponentiationAssignment() {
    getObject()[++key]! **= 2;
    (getObject()[++key] as number) **= 2;
    (getObject()[++key] satisfies number) **= 2;
    (<number>getObject()[++key]) **= 2;
    ((getObject()[++key]) as number)! **= 2;
    (getObject()[++key]) **= 2;

    getObject().x! **= 2;
    (getObject().x as number) **= 2;
    (getObject().x satisfies number) **= 2;
    (<number>getObject().x) **= 2;
    ((getObject().x) as number)! **= 2;
    (getObject().x) **= 2;
}


//// [compoundAssignmentWithTypeOnlyExpressions.js]
"use strict";
let key = 0;
function logicalOrAssignment() {
    getObject()[++key] ||= 1;
    getObject()[++key] ||= 1;
    getObject()[++key] ||= 1;
    getObject()[++key] ||= 1;
    (getObject()[++key]) ||= 1;
    (getObject()[++key]) ||= 1;
    getObject().x ||= 1;
    getObject().x ||= 1;
    getObject().x ||= 1;
    getObject().x ||= 1;
    (getObject().x) ||= 1;
    (getObject().x) ||= 1;
}
function logicalAndAssignment() {
    getObject()[++key] &&= 1;
    getObject()[++key] &&= 1;
    getObject()[++key] &&= 1;
    getObject()[++key] &&= 1;
    (getObject()[++key]) &&= 1;
    (getObject()[++key]) &&= 1;
    getObject().x &&= 1;
    getObject().x &&= 1;
    getObject().x &&= 1;
    getObject().x &&= 1;
    (getObject().x) &&= 1;
    (getObject().x) &&= 1;
}
function nullishAssignment() {
    getObject()[++key] ??= 1;
    getObject()[++key] ??= 1;
    getObject()[++key] ??= 1;
    getObject()[++key] ??= 1;
    (getObject()[++key]) ??= 1;
    (getObject()[++key]) ??= 1;
    getObject().x ??= 1;
    getObject().x ??= 1;
    getObject().x ??= 1;
    getObject().x ??= 1;
    (getObject().x) ??= 1;
    (getObject().x) ??= 1;
}
function exponentiationAssignment() {
    getObject()[++key] **= 2;
    getObject()[++key] **= 2;
    getObject()[++key] **= 2;
    getObject()[++key] **= 2;
    (getObject()[++key]) **= 2;
    (getObject()[++key]) **= 2;
    getObject().x **= 2;
    getObject().x **= 2;
    getObject().x **= 2;
    getObject().x **= 2;
    (getObject().x) **= 2;
    (getObject().x) **= 2;
}
