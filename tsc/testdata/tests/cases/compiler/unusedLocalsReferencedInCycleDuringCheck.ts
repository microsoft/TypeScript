// @strict: true
// @noUnusedLocals: true
// @target: es2022
// @noEmit: true

// Checking the call resolves it within a cycle of flow analysis, during which
// what checking computes is recorded, yet its references are still uses.

declare const assert: { deepStrictEqual<T>(actual: unknown, expected: T): asserts actual is T };
declare function make(): { width: number };
export function test() {
	const first = make();
	let baseline: number[][] | undefined;
	const geometry = () => [first].map(e => [e.width]);
	for (const themeType of ['a', 'b']) {
		baseline ??= geometry();
		for (const active of [true, false]) {
			const border = active ? themeType : 'x';
			assert.deepStrictEqual({ geometry: geometry(), w: first.width, border }, { geometry: baseline, w: 0, border: '' });
		}
	}
}
