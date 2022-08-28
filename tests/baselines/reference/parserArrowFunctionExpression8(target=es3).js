//// [tests/cases/conformance/parser/ecmascript5/ArrowFunctionExpressions/parserArrowFunctionExpression8.ts] ////

//// [fileJs.js]
x ? y => ({ y }) : z => ({ z }) // Legal JS

//// [fileTs.ts]
x ? y => ({ y }) : z => ({ z })


//// [fileJs.js]
x ? function (y) { return ({ y: y }); } : function (z) { return ({ z: z }); }; // Legal JS
//// [fileTs.js]
x ? function (y) { return ({ y: y }); } : function (z) { return ({ z: z }); };
