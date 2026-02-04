//// [tests/cases/compiler/initializedDestructuringAssignmentTypes.ts] ////

//// [initializedDestructuringAssignmentTypes.ts]
const [, a = ''] = ''.match('') || [];

a.toFixed()

//// [initializedDestructuringAssignmentTypes.js]
"use strict";
const [, a = ''] = ''.match('') || [];
a.toFixed();
