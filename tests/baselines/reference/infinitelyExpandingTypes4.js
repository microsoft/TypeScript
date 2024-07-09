//// [tests/cases/compiler/infinitelyExpandingTypes4.ts] ////

//// [infinitelyExpandingTypes4.ts]
interface Query<T> {
    // ...
    groupBy<K>(keySelector: (item: T) => K): Query<Grouping<K, T>>;
    // ...
}

interface QueryEnumerator<T> {
    // ...
    groupBy<K>(keySelector: (item: T) => K): QueryEnumerator<Grouping<K, T>>;
    // ...
}

interface Grouping<K, T> extends Query<T> {
    key(): K;
}

var q1: Query<number>;
var q2: QueryEnumerator<number>;
var q3: Query<number>;

q1 = q2; // should error
q1 = q3; // should not error


//// [infinitelyExpandingTypes4.js]
var q1;
var q2;
var q3;
q1 = q2; // should error
q1 = q3; // should not error
