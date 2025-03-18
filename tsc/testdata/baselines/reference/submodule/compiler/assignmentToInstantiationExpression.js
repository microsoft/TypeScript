//// [tests/cases/compiler/assignmentToInstantiationExpression.ts] ////

//// [assignmentToInstantiationExpression.ts]
let obj: { fn?: <T>() => T } = {};
obj.fn<number> = () => 1234;


let getValue: <T>() => T;
getValue<number> = () => 1234;


let getValue2!: <T>() => T;
getValue2<number> = () => 1234;


//// [assignmentToInstantiationExpression.js]
let obj = {};
obj.fn = () => 1234;
let getValue;
getValue = () => 1234;
let getValue2;
getValue2 = () => 1234;
