//// [tests/cases/compiler/classExpressionAssignment.ts] ////

//// [classExpressionAssignment.ts]
interface A {
  prop: string;
}

// This is invalid
const A: {new(): A} = class {}


//// [classExpressionAssignment.js]
const A = class {
};
