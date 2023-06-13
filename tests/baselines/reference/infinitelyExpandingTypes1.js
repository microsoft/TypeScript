//// [tests/cases/compiler/infinitelyExpandingTypes1.ts] ////

//// [infinitelyExpandingTypes1.ts]
interface List<T> {
    data: T;
    next: List<T>;
    owner: List<List<T>>;
}


interface MyList<T> {
    data: T;
    next: MyList<T>;
    owner: MyList<MyList<T>>;
}

var l: List<number>;
var m: MyList<number>;

l == m; // should error

var l2: List<string>;

l == l2; // should error;

l == l; // should not error

//// [infinitelyExpandingTypes1.js]
var l;
var m;
l == m; // should error
var l2;
l == l2; // should error;
l == l; // should not error
