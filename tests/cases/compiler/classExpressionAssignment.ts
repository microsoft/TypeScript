// @target: es2015
interface A {
  prop: string;
}

// This is invalid
const A: {new(): A} = class {}
