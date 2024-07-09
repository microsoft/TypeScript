interface Sequence<T> {
    each(iterator: (value: T) => void): void;
    map<U>(iterator: (value: T) => U): Sequence<U>;
    filter(iterator: (value: T) => boolean): Sequence<T>;
    groupBy<K>(keySelector: (value: T) => K): Sequence<{ key: K; items: T[]; }>;
}

var s: Sequence<string>;
var s2 = s.groupBy(s => s.length);
var s3 = s2.each(x => { x.key /* Type is K, should be number */ });
