// once caused stack overflow
interface Query<T> {
    selectMany<U>(selector: (item: T) => U[]): Query<U>;
    selectMany<U>(arraySelector: (item: T) => U[], resultSelector: (outer: T, inner: U) => R): Query<R>;
}