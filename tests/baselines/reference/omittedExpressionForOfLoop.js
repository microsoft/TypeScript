//// [omittedExpressionForOfLoop.ts]
for (const [,] of doesNotExist) {
}

//// [omittedExpressionForOfLoop.js]
for (var _i = 0, doesNotExist_1 = doesNotExist; _i < doesNotExist_1.length; _i++) {
    var _a = doesNotExist_1[_i];
}
