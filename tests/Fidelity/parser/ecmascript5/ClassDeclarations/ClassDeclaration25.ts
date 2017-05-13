interface IList<T> {
    data(): T;
    next(): string;
}
class List<U> implements IList<U> {
    data(): U;
    next(): string;
}
