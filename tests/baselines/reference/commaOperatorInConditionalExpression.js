//// [commaOperatorInConditionalExpression.ts]
function f (m: string) {
    [1, 2, 3].map(i => {
        return true? { [m]: i } : { [m]: i + 1 }
    })
}

//// [commaOperatorInConditionalExpression.js]
function f(m) {
    [1, 2, 3].map(function (i) {
        return true ? (_a = {}, _a[m] = i, _a) : (_b = {}, _b[m] = i + 1, _b);
        var _a, _b;
    });
}
