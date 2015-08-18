//// [tests/cases/compiler/unclosedExportClause02.ts] ////

//// [t1.ts]

export var x = "x";

//// [t2.ts]
export { x, from
    "./t1";

//// [t3.ts]
export { from
    "./t1";

//// [t4.ts]
export { x as a from
    "./t1";

//// [t5.ts]
export { x as a, from
    "./t1";

//// [t1.js]
exports.x = "x";
//// [t2.js]
"./t1";
//// [t3.js]
"./t1";
//// [t4.js]
"./t1";
//// [t5.js]
"./t1";
