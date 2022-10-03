//// [emptyAssignmentPatterns01_ES6.ts]
var a: any;

({} = a);
([] = a);

//// [emptyAssignmentPatterns01_ES6.js]
var a;
({} = a);
([] = a);


//// [emptyAssignmentPatterns01_ES6.d.ts]
declare var a: any;
