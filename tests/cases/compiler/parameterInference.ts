// CASE 1
function foo(s) {
    Math.sqrt(s)
}

// CASE 2
declare function swapNumberString(n: string): number;
declare function swapNumberString(n: number): string;

// Should have identical signature to swapNumberString
function subs(s) {
  return swapNumberString(s);
}

// CASE 3
function f(x: number){
   return x;
}

function g(x){ return x};

function h(x){ return f(x); };
