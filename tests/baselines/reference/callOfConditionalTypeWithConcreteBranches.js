//// [tests/cases/compiler/callOfConditionalTypeWithConcreteBranches.ts] ////

//// [callOfConditionalTypeWithConcreteBranches.ts]
type Q<T> = number extends T ? (n: number) => void : never;
function fn<T>(arg: Q<T>) {
  // Expected: OK
  // Actual: Cannot convert 10 to number & T
  arg(10);
}
// Legal invocations are not problematic
fn<string | number>(m => m.toFixed());
fn<number>(m => m.toFixed());

// Ensure the following real-world example that relies on substitution still works
type ExtractParameters<T> = "parameters" extends keyof T
  // The above allows "parameters" to index `T` since all later
  // instances are actually implicitly `"parameters" & keyof T`
  ?  {
        [K in keyof T["parameters"]]: T["parameters"][K];
      }[keyof T["parameters"]]
  : {};

// Original example, but with inverted variance
type Q2<T> = number extends T ? (cb: (n: number) => void) => void : never;
function fn2<T>(arg: Q2<T>) {
  function useT(_arg: T): void {}
  // Expected: OK
  arg(arg => useT(arg));
}
// Legal invocations are not problematic
fn2<string | number>(m => m(42));
fn2<number>(m => m(42));

// webidl-conversions example where substituion must occur, despite contravariance of the position
// due to the invariant usage in `Parameters`

type X<V> = V extends (...args: any[]) => any ? (...args: Parameters<V>) => void : Function;

// vscode - another `Parameters` example
export type AddFirstParameterToFunctions<Target> = {
  [K in keyof Target]: Target[K] extends (...args: any[]) => void
      ? (...args: Parameters<Target[K]>) => void
      : void
};

//// [callOfConditionalTypeWithConcreteBranches.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fn(arg) {
    // Expected: OK
    // Actual: Cannot convert 10 to number & T
    arg(10);
}
// Legal invocations are not problematic
fn(function (m) { return m.toFixed(); });
fn(function (m) { return m.toFixed(); });
function fn2(arg) {
    function useT(_arg) { }
    // Expected: OK
    arg(function (arg) { return useT(arg); });
}
// Legal invocations are not problematic
fn2(function (m) { return m(42); });
fn2(function (m) { return m(42); });
