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