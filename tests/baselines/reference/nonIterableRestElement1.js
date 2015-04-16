//// [nonIterableRestElement1.ts]
var c = {};
[...c] = ["", 0];

//// [nonIterableRestElement1.js]
var c = {};
c = ["", 0].slice(0);
