//// [tests/cases/compiler/sourceMapValidationDestructuringVariableStatementObjectBindingPattern4.ts] ////

//// [sourceMapValidationDestructuringVariableStatementObjectBindingPattern4.ts]
var {x = 500,
     y} = { x: 20, y: "hi" };

//// [sourceMapValidationDestructuringVariableStatementObjectBindingPattern4.js]
var { x = 500, y } = { x: 20, y: "hi" };
//# sourceMappingURL=sourceMapValidationDestructuringVariableStatementObjectBindingPattern4.js.map