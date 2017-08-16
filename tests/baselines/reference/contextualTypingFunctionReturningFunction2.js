//// [contextualTypingFunctionReturningFunction2.ts]
declare function f(n: number): void;
declare function f(cb: () => (n: number) => number): void;

f(() => n => n);


//// [contextualTypingFunctionReturningFunction2.js]
f(function () { return function (n) { return n; }; });
