//// [tests/cases/compiler/inOperator.ts] ////

//// [inOperator.ts]
var a=[];

for (var x in a) {}

if (3 in a) {}

var b = '' in 0;

declare var c: any;
declare var y: number;
if (y in c) { }


//// [inOperator.js]
var a = [];
for (var x in a) { }
if (3 in a) { }
var b = '' in 0;
if (y in c) { }
