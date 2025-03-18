//// [tests/cases/conformance/types/typeRelationships/recursiveTypes/arrayLiteralsWithRecursiveGenerics.ts] ////

//// [arrayLiteralsWithRecursiveGenerics.ts]
class List<T> {
    data: T;
    next: List<List<T>>;
}

class DerivedList<U> extends List<U> {
    foo: U;
    // next: List<List<U>>
}

class MyList<T> {
    data: T;
    next: MyList<MyList<T>>;
}

var list: List<number>;
var list2: List<string>;
var myList: MyList<number>;

var xs = [list, myList]; // {}[]
var ys = [list, list2]; // {}[]
var zs = [list, null]; // List<number>[]

var myDerivedList: DerivedList<number>;
var as = [list, myDerivedList]; // List<number>[]

//// [arrayLiteralsWithRecursiveGenerics.js]
class List {
    data;
    next;
}
class DerivedList extends List {
    foo;
}
class MyList {
    data;
    next;
}
var list;
var list2;
var myList;
var xs = [list, myList];
var ys = [list, list2];
var zs = [list, null];
var myDerivedList;
var as = [list, myDerivedList];
