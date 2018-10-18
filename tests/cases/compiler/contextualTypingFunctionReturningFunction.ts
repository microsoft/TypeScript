interface I {
	a(s: string): void;
	b(): (n: number) => void;
}

declare function f(i: I): void;

f({
	a: s => {},
	b: () => n => {},
});
