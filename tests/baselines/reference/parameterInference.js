//// [parameterInference.ts]
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
function f3(x: number){
   return x;
}

function g3(x){ return f3(x); };
// => function g3(x: number): number

// CASE 4
declare function f4(g: Function)
function g4(x) {
  f4(() => {
    Math.sqrt(x)
  })
}


//// [parameterInference.js]
// CASE 1
function foo(s) {
    Math.sqrt(s);
}
function subs(s) {
    return swapNumberString(s);
}
// => function subs(s: string): number
// NOTE: Still broken, needs to deal with overloads. Should have been inferred as:
// => (s: string) => number & (s: number) => string
// CASE 3
function f3(x) {
    return x;
}
function g3(x) { return f3(x); }
;
function g4(x) {
    f4(function () {
        Math.sqrt(x);
    });
}
