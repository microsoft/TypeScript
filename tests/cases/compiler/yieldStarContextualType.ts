// @target: esnext
// @noEmit: true

declare const g: <T, U, V>() => Generator<T, U, V>;

function* f(): Generator<string, void, unknown> {
    const x1 = yield* g();
    const x2: number = yield* g();
}