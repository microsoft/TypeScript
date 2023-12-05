//// [tests/cases/conformance/types/typeRelationships/recursiveTypes/objectTypeWithRecursiveWrappedPropertyCheckedNominally.ts] ////

//// [objectTypeWithRecursiveWrappedPropertyCheckedNominally.ts]
// Types with infinitely expanding recursive types are type checked nominally

class List<T> {
    data: T;
    next: List<List<T>>;
}

class MyList<T> {
    data: T;
    next: MyList<MyList<T>>;
}

var list1 = new List<number>();
var list2 = new List<string>();

var myList1 = new MyList<number>();
var myList2 = new MyList<string>();

list1 = myList1; // error, not nominally equal
list1 = myList2; // error, type mismatch

list2 = myList1; // error, not nominally equal
list2 = myList2; // error, type mismatch

var rList1 = new List<List<number>>();
var rMyList1 = new List<MyList<number>>();
rList1 = rMyList1; // error, not nominally equal

function foo<T extends List<number>, U extends MyList<number>>(t: T, u: U) {
    t = u; // error
    u = t; // error

    var a: List<number>;
    var b: MyList<number>;
    a = t; // ok
    a = u; // error
    b = t; // error
    b = u; // ok
}

function foo2<T extends U, U extends MyList<number>>(t: T, u: U) {
    t = u; // error
    u = t; // was error, ok after constraint made illegal, doesn't matter

    var a: List<number>;
    var b: MyList<number>;

    a = t; // error
    a = u; // error
    b = t; // ok
    b = u; // ok
}

//// [objectTypeWithRecursiveWrappedPropertyCheckedNominally.js]
// Types with infinitely expanding recursive types are type checked nominally
var List = /** @class */ (function () {
    function List() {
    }
    return List;
}());
var MyList = /** @class */ (function () {
    function MyList() {
    }
    return MyList;
}());
var list1 = new List();
var list2 = new List();
var myList1 = new MyList();
var myList2 = new MyList();
list1 = myList1; // error, not nominally equal
list1 = myList2; // error, type mismatch
list2 = myList1; // error, not nominally equal
list2 = myList2; // error, type mismatch
var rList1 = new List();
var rMyList1 = new List();
rList1 = rMyList1; // error, not nominally equal
function foo(t, u) {
    t = u; // error
    u = t; // error
    var a;
    var b;
    a = t; // ok
    a = u; // error
    b = t; // error
    b = u; // ok
}
function foo2(t, u) {
    t = u; // error
    u = t; // was error, ok after constraint made illegal, doesn't matter
    var a;
    var b;
    a = t; // error
    a = u; // error
    b = t; // ok
    b = u; // ok
}
