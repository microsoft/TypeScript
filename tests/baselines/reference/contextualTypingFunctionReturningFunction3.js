//// [contextualTypingFunctionReturningFunction3.ts]
declare function f(n: number): void;
declare function f(cb: () => (n: number) => number): void;

f(() => {
    if (1)
        return n => n;
    else
        return n => n + 1;
});

// Is context sensitive if *any* return expression is.
function notContextSensitive(n: number): number { return n; }
f(() => {
    if (1)
        return notContextSensitive;
    else
        return n => n + 1;
});


//// [contextualTypingFunctionReturningFunction3.js]
f(function () {
    if (1)
        return function (n) { return n; };
    else
        return function (n) { return n + 1; };
});
// Is context sensitive if *any* return expression is.
function notContextSensitive(n) { return n; }
f(function () {
    if (1)
        return notContextSensitive;
    else
        return function (n) { return n + 1; };
});
