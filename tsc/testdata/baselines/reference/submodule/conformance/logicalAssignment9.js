//// [tests/cases/conformance/es2021/logicalAssignment/logicalAssignment9.ts] ////

//// [logicalAssignment9.ts]
declare let x: { a?: boolean };

x.a ??= true;
x.a &&= false;


//// [logicalAssignment9.js]
x.a ??= true;
x.a &&= false;
