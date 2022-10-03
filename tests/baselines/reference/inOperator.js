//// [inOperator.ts]
var a=[];

for (var x in a) {}

if (3 in a) {}

var b = '' in 0;

var c: any;
var y: number;
if (y in c) { }


//// [inOperator.js]
var a = [];
for (var x in a) { }
if (3 in a) { }
var b = '' in 0;
var c;
var y;
if (y in c) { }
