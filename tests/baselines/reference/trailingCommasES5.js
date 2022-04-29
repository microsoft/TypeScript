//// [trailingCommasES5.ts]
var o1 = { a: 1, b: 2 };
var o2 = { a: 1, b: 2, };
var o3 = { a: 1, };
var o4 = {};

var a1 = [1, 2];
var a2 = [1, 2, ];
var a3 = [1, ];
var a4 = [];
var a5 = [1, , ];
var a6 = [, , ];

//// [trailingCommasES5.js]
var o1 = { a: 1, b: 2 };
var o2 = { a: 1, b: 2, };
var o3 = { a: 1, };
var o4 = {};
var a1 = [1, 2];
var a2 = [1, 2,];
var a3 = [1,];
var a4 = [];
var a5 = [1, ,];
var a6 = [, ,];
