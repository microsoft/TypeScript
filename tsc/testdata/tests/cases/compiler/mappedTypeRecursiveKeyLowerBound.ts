// @strict: true
// @noEmit: true

type Merge<A, B> = Omit<A, keyof B> & B;
type Options<T> = Omit<Merge<{ a: number }, T>, "unused">;

type Constrained<T extends Options<T>> = T;
type Resolved<T extends Options<T>> = Constrained<Options<T>>;
