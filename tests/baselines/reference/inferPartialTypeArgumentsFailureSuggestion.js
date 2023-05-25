//// [inferPartialTypeArgumentsFailureSuggestion.ts]
type _ = number;

function f<T>(x: T extends number ? number : never) {}

f<_>(42);

f<[_][0]>(42);


//// [inferPartialTypeArgumentsFailureSuggestion.js]
function f(x) { }
f(42);
f(42);
