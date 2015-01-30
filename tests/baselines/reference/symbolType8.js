//// [symbolType8.ts]
var s = Symbol.for("compare");
s < s;
s < 0;
s > s;
s > 0;
s <= s;
s <= 0;
s >= s;
s >= 0;

//// [symbolType8.js]
var s = Symbol.for("compare");
s < s;
s < 0;
s > s;
s > 0;
s <= s;
s <= 0;
s >= s;
s >= 0;
