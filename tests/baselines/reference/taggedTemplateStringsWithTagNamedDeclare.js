//// [taggedTemplateStringsWithTagNamedDeclare.ts]
function declare(x: any, ...ys: any[]) {
}

declare `Hello ${0} world!`;

//// [taggedTemplateStringsWithTagNamedDeclare.js]
function declare(x) {
    var ys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        ys[_i - 1] = arguments[_i];
    }
}
(_a = ["Hello ", " world!"], _a.raw = ["Hello ", " world!"], declare(_a, 0));
var _a;
