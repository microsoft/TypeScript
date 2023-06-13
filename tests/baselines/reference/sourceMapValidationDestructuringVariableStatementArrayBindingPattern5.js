//// [tests/cases/compiler/sourceMapValidationDestructuringVariableStatementArrayBindingPattern5.ts] ////

//// [sourceMapValidationDestructuringVariableStatementArrayBindingPattern5.ts]
var [x] = [1, 2];
var [y, z] = [1, 2];

//// [sourceMapValidationDestructuringVariableStatementArrayBindingPattern5.js]
var x = [1, 2][0];
var _a = [1, 2], y = _a[0], z = _a[1];
//# sourceMappingURL=sourceMapValidationDestructuringVariableStatementArrayBindingPattern5.js.map