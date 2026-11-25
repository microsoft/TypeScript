// @noEmit: true
// @target: esnext
// @checkOrder: default, typesfirst

// Comparing never[] to B<0> nests comparisons of the members of A and B.
// Whether they are cut short as deeply nested must not depend on whether the
// annotation of b is resolved before checking a instantiates slice.

interface A<T> {
    slice(): B<T>;
    every<S extends T>(predicate: (value: T) => value is S): this is A<S>;
    flatMap<U>(callback: (value: T) => U | readonly U[] | A<U>): U[];
}
interface B<T> extends A<T> {}
const a: A<0> = [];
const b: B<0> = [];
