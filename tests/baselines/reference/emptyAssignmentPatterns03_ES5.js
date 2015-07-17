//// [emptyAssignmentPatterns03_ES5.ts]

var a: any;

({} = {} = a);
([] = [] = a);

//// [emptyAssignmentPatterns03_ES5.js]
var a;
(_a = (, a), _a);
(_b = (, a), _b);
var _a, _b;
