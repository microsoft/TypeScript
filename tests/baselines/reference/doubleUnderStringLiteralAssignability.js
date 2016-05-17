//// [doubleUnderStringLiteralAssignability.ts]
var shouldBeOk: '__dunder' = '__dunder';
var bad: '__dunder' = 'no_dunder';


//// [doubleUnderStringLiteralAssignability.js]
var shouldBeOk = '__dunder';
var bad = 'no_dunder';
