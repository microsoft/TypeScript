//// [tests/cases/compiler/initializedDestructuringAssignmentTypes.ts] ////

//// [initializedDestructuringAssignmentTypes.ts]
const [, a = ''] = ''.match('') || [];

a.toFixed()

//// [initializedDestructuringAssignmentTypes.js]
"use strict";
var _a = ''.match('') || [], _b = _a[1], a = _b === void 0 ? '' : _b;
a.toFixed();
