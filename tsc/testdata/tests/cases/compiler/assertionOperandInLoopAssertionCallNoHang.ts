// @strict: true
// @noTypesAndSymbols: true
// @checkOrder: default, reverse, isolated, typesfirst

declare function assertEqual<T>(actual: unknown, expected: T): asserts actual;
declare class C {}
declare function on(cb: (e: undefined) => void): void;
declare const data: [];

on(e => {
	assertEqual(e, false);
	for (;;) {
		assertEqual(e as C, data);
	}
});
