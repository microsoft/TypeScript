//// [tests/cases/conformance/types/specifyingTypes/typeQueries/invalidTypeOfTarget.ts] ////

//// [invalidTypeOfTarget.ts]
var x1: typeof {};
var x2: typeof (): void;
var x3: typeof 1;
var x4: typeof '';
var x5: typeof [];
var x6: typeof null;
var x7: typeof function f() { };
var x8: typeof /123/;

//// [invalidTypeOfTarget.js]
var x1, _a = void 0;
var x2;
(function () { return ; });
var x3;
1;
var x4;
'';
var x5;
var x6;
var x7, f;
(function () { });
var x8;
/123/;
