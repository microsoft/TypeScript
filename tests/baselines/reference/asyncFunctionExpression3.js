//// [asyncFunctionExpression3.ts]
var foo = function (await = await) {
}

//// [asyncFunctionExpression3.js]
var foo = function (await) {
    if (await === void 0) { await = await; }
};
