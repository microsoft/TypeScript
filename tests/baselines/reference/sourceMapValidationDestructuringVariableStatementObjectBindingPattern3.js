//// [tests/cases/compiler/sourceMapValidationDestructuringVariableStatementObjectBindingPattern3.ts] ////

//// [sourceMapValidationDestructuringVariableStatementObjectBindingPattern3.ts]
var {x = 500} = { x: 20 };

//// [sourceMapValidationDestructuringVariableStatementObjectBindingPattern3.js]
var _a = { x: 20 }.x, x = _a === void 0 ? 500 : _a;
//# sourceMappingURL=sourceMapValidationDestructuringVariableStatementObjectBindingPattern3.js.map