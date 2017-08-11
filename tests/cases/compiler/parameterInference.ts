// CASE 1 - Propagation of parameter types from invocations
function foo(s) {
    Math.sqrt(s)
}
// => function foo(s: number): void

// CASE 2 - Inference from invocation of overloaded functions
declare function swapNumberString(n: string): number;
declare function swapNumberString(n: number): string;

function subs(s) {
  return swapNumberString(s);
}
// => function subs(s: string): number
// NOTE: Still broken, needs to deal with overloads. Should have been inferred as:
// => (s: string) => number & (s: number) => string

// CASE 3 - Propagation of explicitly annotated parameter types
function f3(x: number){
   return x;
}

function g3(x){ return f3(x); };
// => function g3(x: number): number

// CASE 4 - Inference from invocation sites within function expressions passed as arguments 
declare function f4(g: Function)
function g4(x) {
  f4(() => {
    Math.sqrt(x)
  })
}
