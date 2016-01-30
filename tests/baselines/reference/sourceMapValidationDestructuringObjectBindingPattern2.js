//// [sourceMapValidationDestructuringObjectBindingPattern2.ts]

var {x} = { x: 20 };
var { a, b } = { a: 30, b: 40 };

//// [sourceMapValidationDestructuringObjectBindingPattern2.js]
var x = { x: 20 }.x;
var _a = { a: 30, b: 40 }, a = _a.a, b = _a.b;
//# sourceMappingURL=sourceMapValidationDestructuringObjectBindingPattern2.js.map