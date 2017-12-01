//// [sourceMapValidationDestructuringVariableStatementObjectBindingPattern4.ts]
var {x = 500,
     y} = { x: 20, y: "hi" };

//// [sourceMapValidationDestructuringVariableStatementObjectBindingPattern4.js]
var _a = { x: 20, y: "hi" }, _b = _a.x, x = _b === void 0 ? 500 : _b, y = _a.y;
//# sourceMappingURL=sourceMapValidationDestructuringVariableStatementObjectBindingPattern4.js.map