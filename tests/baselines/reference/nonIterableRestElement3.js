//// [nonIterableRestElement3.ts]
var c = { bogus: 0 };
[...c] = ["", 0];

//// [nonIterableRestElement3.js]
var c = { bogus: 0 };
c = ["", 0].slice(0);
