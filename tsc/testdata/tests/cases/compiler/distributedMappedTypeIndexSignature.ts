// @strict: true
// @noEmit: true

type Alias<T> = { [K in keyof T]: (state: T) => void };
type Check<T, X extends { [x: string]: (state: T) => void }> = X;
type Use1<T> = Check<T, Alias<T>>;
type Use2<T> = Check<T, { [K in keyof T]: (state: T) => void }>;

function f<T>(alias: Alias<T>, inline: { [K in keyof T]: (state: T) => T[K] }) {
    const a: Record<string, (state: T) => unknown> = alias;
    const b: Record<string, (state: T) => unknown> = inline;
}
