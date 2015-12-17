//// [stringLiteralValueInDestructuredConstDecl01.ts]

const {a: {b = "foo"}} = {
    a: {
    }
};

var foo1: "foo" = b;


//// [stringLiteralValueInDestructuredConstDecl01.js]
var _a = {
    a: {}
}.a.b, b = _a === void 0 ? "foo" : _a;
var foo1 = b;
