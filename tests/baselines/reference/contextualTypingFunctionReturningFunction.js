//// [contextualTypingFunctionReturningFunction.ts]
interface I {
	a(s: string): void;
	b(): (n: number) => void;
}

declare function f(i: I): void;

f({
	a: s => {},
	b: () => n => {},
});


//// [contextualTypingFunctionReturningFunction.js]
f({
    a: function (s) { },
    b: function () { return function (n) { }; }
});
