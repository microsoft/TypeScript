//// [taggedTemplateStringsWithTypeErrorInFunctionExpressionsInSubstitutionExpressionES6.ts]

function foo(...rest: any[]) {
}

foo `${function (x: number) { x = "bad"; } }`;

//// [taggedTemplateStringsWithTypeErrorInFunctionExpressionsInSubstitutionExpressionES6.js]
function foo() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i - 0] = arguments[_i];
    }
}
foo `${function (x) {
    x = "bad";
}}`;
