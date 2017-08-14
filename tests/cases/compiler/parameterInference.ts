// CASE 1 - Propagation of parameter types from invocations
function f1(s) {
    Math.sqrt(s)
}
// => function f1(s: number): void

// CASE 2 - Inference from invocation of overloaded functions
declare function swapNumberString(n: string): number;
declare function swapNumberString(n: number): string;

function f2(s) {
  return swapNumberString(s);
}
// => function f2(s: string): number
// TODO: Broken, needs to deal with overloads. Should have been inferred as:
// => (s: string) => number & (s: number) => string

// CASE 3 - Propagation of explicitly annotated parameter types
declare function f3(x: number)

function g3(x){
  return f3(x);
}
// => function g3(x: number): any

// CASE 4 - Inference from invocation sites within function expressions passed as arguments 
declare function f4(g: Function)

function g4(x) {
  f4(() => {
    Math.sqrt(x)
  })
}
// => function g4(x: number): void

// CASE 5 - Ensure termination for recursive invocations
function f5(s) {
  f5(s)
}
// => function f5(s: any): void

// CASE 6 - Inference as intersection from multiple usages
function f6(x) {
  Math.sqrt(x)
  "".indexOf(x)
}
// => function f6(x: string & number): void

// CASE 7 - Inference as overloaded function from control-flow discriminated usages
declare function isNumber<T>(x: T): x is T & number

function f7(x) {
  return isNumber(x) ? Math.sqrt(x) : "".indexOf(x)
}
// function f7(x: string & number & T): number
// TODO: Broken, generic type parameter leaks and x is inferred too conservatively (string & number)
// Should be:
// => (s: string) => number & (s: number) => number

// CASE 8 - Inference by substitution of constraints for generic functions
declare function generic<T>(t: T)

function f8(x) {
  generic(x)
}
// function f8(x: T): void
// TODO: Broken, type parameter leaks. Should be inferred as:
// function f8(x: {}): void
