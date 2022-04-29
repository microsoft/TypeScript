interface Sequence<T> {
    each(iterator: (value: T) => void ): void;
    map<U>(iterator: (value: T) => U): Sequence<U>;
    filter(iterator: (value: T) => boolean): Sequence<T>;
    groupBy<K>(keySelector: (value: T) => K): Sequence<{ key: K; items: Sequence<T>; }>;
}
