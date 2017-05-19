//// [emptyAssignmentPatterns01_ES5.ts]
var a: any;

({} = a);
([] = a);

//// [emptyAssignmentPatterns01_ES5.js]
var a;
(a);
(a);


//// [emptyAssignmentPatterns01_ES5.d.ts]
declare var a: any;
