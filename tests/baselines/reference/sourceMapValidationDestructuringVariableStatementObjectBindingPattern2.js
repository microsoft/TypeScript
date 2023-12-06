//// [tests/cases/compiler/sourceMapValidationDestructuringVariableStatementObjectBindingPattern2.ts] ////

//// [sourceMapValidationDestructuringVariableStatementObjectBindingPattern2.ts]
var {x} = { x: 20 };
var { a, b } = { a: 30, b: 40 };

//// [sourceMapValidationDestructuringVariableStatementObjectBindingPattern2.js]
var x = { x: 20 }.x;
var _a = { a: 30, b: 40 }, a = _a.a, b = _a.b;
//# sourceMappingURL=sourceMapValidationDestructuringVariableStatementObjectBindingPattern2.js.map