//// [tests/cases/compiler/commaOperatorInConditionalExpression.ts] ////

//// [commaOperatorInConditionalExpression.ts]
function f (m: string) {
    [1, 2, 3].map(i => {
        return true? { [m]: i } : { [m]: i + 1 }
    })
}

//// [commaOperatorInConditionalExpression.js]
function f(m) {
    [1, 2, 3].map(i => {
        return true ? { [m]: i } : { [m]: i + 1 };
    });
}
