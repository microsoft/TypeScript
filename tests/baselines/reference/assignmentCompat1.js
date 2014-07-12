//// [assignmentCompat1.ts]
var x = {one: 1};
var y: {[index:string]: any};

x = y;
y = x;

//// [assignmentCompat1.js]
var x = { one: 1 };
var y;
x = y;
y = x;
