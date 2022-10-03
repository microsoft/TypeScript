// @target: esnext
// @strict: true
// @noEmit: true
declare function f1<T, R, S>(gen: () => Generator<R, T, S>): void;
f1<0, 0, 1>(function* () {
	const a = yield 0;
	return 0;
});

declare function f2<T, R, S>(gen: () => Generator<R, T, S> | AsyncGenerator<R, T, S>): void;
f2<0, 0, 1>(async function* () {
	const a = yield 0;
	return 0;
});