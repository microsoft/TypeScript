//// [tests/cases/compiler/sourceMapValidationDestructuringVariableStatementArrayBindingPattern7.ts] ////

//// [sourceMapValidationDestructuringVariableStatementArrayBindingPattern7.ts]
var [x = 20, j] = [1, 2];

//// [sourceMapValidationDestructuringVariableStatementArrayBindingPattern7.js]
var _a = [1, 2], _b = _a[0], x = _b === void 0 ? 20 : _b, j = _a[1];
//# sourceMappingURL=sourceMapValidationDestructuringVariableStatementArrayBindingPattern7.js.map