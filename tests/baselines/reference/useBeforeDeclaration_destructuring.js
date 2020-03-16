//// [useBeforeDeclaration_destructuring.ts]
a;
let {a, b = a} = {a: '', b: 1};
b;

function test({c, d = c}: Record<string, number>) {}


//// [useBeforeDeclaration_destructuring.js]
a;
var _a = { a: '', b: 1 }, a = _a.a, _b = _a.b, b = _b === void 0 ? a : _b;
b;
function test(_a) {
    var c = _a.c, _b = _a.d, d = _b === void 0 ? c : _b;
}
