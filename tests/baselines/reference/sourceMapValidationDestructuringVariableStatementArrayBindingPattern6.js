//// [tests/cases/compiler/sourceMapValidationDestructuringVariableStatementArrayBindingPattern6.ts] ////

//// [sourceMapValidationDestructuringVariableStatementArrayBindingPattern6.ts]
var [x = 20] = [1, 2];

//// [sourceMapValidationDestructuringVariableStatementArrayBindingPattern6.js]
var _a = [1, 2][0], x = _a === void 0 ? 20 : _a;
//# sourceMappingURL=sourceMapValidationDestructuringVariableStatementArrayBindingPattern6.js.map