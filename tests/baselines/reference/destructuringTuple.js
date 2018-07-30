//// [destructuringTuple.ts]
declare var tuple: [boolean, number, ...string[]];

const [a, b, c, ...rest] = tuple;


//// [destructuringTuple.js]
"use strict";
var a = tuple[0], b = tuple[1], c = tuple[2], rest = tuple.slice(3);
