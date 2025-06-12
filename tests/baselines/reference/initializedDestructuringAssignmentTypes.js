//// [tests/cases/compiler/initializedDestructuringAssignmentTypes.ts] ////

//// [initializedDestructuringAssignmentTypes.ts]
const [, a = ''] = ''.match('') || [];

a.toFixed()

//// [initializedDestructuringAssignmentTypes.js]
const [, a = ''] = ''.match('') || [];
a.toFixed();
