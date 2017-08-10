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
