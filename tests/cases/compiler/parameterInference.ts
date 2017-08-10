// CASE 1
function foo(s) {
    Math.sqrt(s)
}
// => function foo(s: number): void

// CASE 2
declare function swapNumberString(n: string): number;
declare function swapNumberString(n: number): string;

function subs(s) {
  return swapNumberString(s);
}
// => function subs(s: string): number
// NOTE: Still broken, needs to deal with overloads. Should have been inferred as:
// => (s: string) => number & (s: number) => string

// CASE 3
function f(x: number){
   return x;
}

function g(x){ return f(x); };
// => function g(x: number): number
// CASE 4
declare function f4(g: Function)
function g4(x) {
  f4(() => {
    Math.sqrt(x)
  })
}
