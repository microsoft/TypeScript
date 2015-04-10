//// [nonIterableRestElement3.ts]
var c = { bogus: 0 };
[...c] = ["", 0];

//// [nonIterableRestElement3.js]
var c = { bogus: 0 };
_a = ["", 0], c = _a.slice(0);
var _a;
