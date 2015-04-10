//// [nonIterableRestElement1.ts]
var c = {};
[...c] = ["", 0];

//// [nonIterableRestElement1.js]
var c = {};
_a = ["", 0], c = _a.slice(0);
var _a;
